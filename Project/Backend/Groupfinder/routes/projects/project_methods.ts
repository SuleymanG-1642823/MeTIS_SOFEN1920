const db_conn = require('../../databaseconnection');
const moment = require('moment');
import Project from '../../types/project';
import Profile from '../../types/profile';
import ProjectMatch from '../../types/projectMatch';
import ProfileMatch from '../../types/profileMatch';
const $profiles_methods = require('../profiles/profiles_methods');

/**
 * Get project with specific ID from the database.
 * @param projectID the id of the project that will be searched for
 */
function getProject(projectID: number): Promise<Project> {
    return new Promise(
        (resolve:any, reject:any) => {
            const query: string = 'SELECT project.id AS projectID, name, status, pitch, created_at, edited_at, user.id AS userID, user.first_name, user.last_name  FROM project JOIN user ON user.id=project.creator_id WHERE project.id=?;';
            const params: any[] = [projectID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err){
                    console.log(`Error while fetching project from database: ${err}`);
                    reject("500");
                } else if (rows.length < 1){
                    console.log(`Error finding project with id ${projectID}.`);
                    reject("404");
                } else {
                    try{
                        const profiles_result: Profile[] = await $profiles_methods.getProjectProfiles(rows[0].projectID);
                        const project: Project = {
                            id: rows[0].projectID,
                            name: rows[0].name,
                            status: rows[0].status,
                            pitch: rows[0].pitch,
                            created_at: moment(rows[0].created_at).format('YYYY-MM-DD hh:mm:ss'),
                            edited_at: moment(rows[0].edited_at).format('YYYY-MM-DD hh:mm:ss'),
                            creator_id: rows[0].userID,
                            creator_first_name: rows[0].first_name,
                            creator_last_name: rows[0].last_name,
                            profiles: profiles_result
                        }
                        resolve(project);
                    } catch (err) {
                        console.log("Error while fetching profiles of a project from the database.");
                        reject(err);
                    }                    
                }
            });
        }
    );
}


/**
 * Get all projects sorted from newest to oldest from the database.
 */
function getAllProjects(): Promise<Project[]> {
    return new Promise(
        (resolve:any, reject:any) => {
            const query: string = 'SELECT project.id AS projectID, name, status, pitch, created_at, edited_at, user.id AS userID, user.first_name, user.last_name  FROM project JOIN user ON user.id=project.creator_id ORDER BY created_at DESC;';
            db_conn.query(query, async (err: any, rows: any) => {
                if (err) {
                    console.log(`Error while fetching all projects from the database.\n${err}`);
                    reject("500");
                } else {
                    let allProjects: Project[] = [];
                    for (let i = 0; i < rows.length; i++){
                        const profiles_result: Profile[] = await $profiles_methods.getProjectProfiles(rows[i].projectID);
                        let project: Project = {
                            id: rows[i].projectID,
                            name: rows[i].name,
                            status: rows[i].status,
                            pitch: rows[i].pitch,
                            created_at: moment(rows[i].created_at).format('YYYY-MM-DD hh:mm:ss'),
                            edited_at: moment(rows[i].edited_at).format('YYYY-MM-DD hh:mm:ss'),
                            creator_id: rows[i].userID,
                            creator_first_name: rows[i].first_name,
                            creator_last_name: rows[i].last_name,
                            profiles: profiles_result
                        }
                        allProjects.push(project);
                    }
                    resolve(allProjects);
                }
            });
        }
    );
}

/**
 * Get matching projects for the user from the database.
 * @param userID ID of the user to find project matches for
 * @returns <Array<Object>>: formaat:
 *      [
 *          { 
 *              project: Project, 
 *              matches: [ 
 *                          { profileID: <ID>, profileName: <name>, matchingPercentile <%> },
 *                          ...
 *                       ] 
 *          },
 *          ...
 *      ]
 */
// Promise<Array<Object>>
function getMatchingProjects(userID: number): any {
    function createProject(projectID: number, projectName: string): Project{
        let newProject: Project = {
            id: projectID,
            name: projectName,
            status: 0,
            pitch: '',
            created_at: '',
            edited_at: '',
            creator_id: -1,
            creator_first_name: '',
            creator_last_name: '',
            profiles: []
        }

        return newProject;
    }
    
    function createProfileMatch(profileID: number, profileName: string){
        // create new Profile match
        let newProfileMatch: ProfileMatch = {
            profileID: profileID,
            profileName: profileName,
            matchingPercentile: 0
        }

        return newProfileMatch;
    }

    return new Promise((resolve: any, reject: any) => {
        // project_id, project_name, profile_id, profile_name, skill_name, skill_weight, matches
        const colossalQuery: string = `
        SELECT project_id, project_name, profile_id, profile_name, COUNT(profile_id) as count_skills, SUM(not IsNull(user_skills.id)) as count_matching_skills
        FROM 
          (
            SELECT skill_name, user.id
            FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
            WHERE user.id = ?
          ) AS user_skills
          RIGHT JOIN
          (
            SELECT proj.id AS project_id, proj.name AS project_name,
                    prof.profile_id, prof.profile_name,
                    prof.skill_name, prof.skill_experience, prof.skill_weight
            FROM 
            (
              SELECT project_id, profile_id, name as profile_name, skill_name, skill_experience, weight as skill_weight
              FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
              WHERE exists
              (
                  SELECT 1
                  FROM 
                  (
                    SELECT profile_skills.id as profile_id
                    FROM 
                      (
                        SELECT skill_name as user_skill_name
                        FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
                        WHERE user.id = ?
                      ) AS user_skills,
                      (
                        SELECT skill_name as profile_skill_name, profile.id
                        FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
                      ) profile_skills
                    WHERE user_skill_name = profile_skill_name
                    GROUP BY profile_skills.id
                  ) AS profiles_with_matching_skills
                  WHERE profiles_with_matching_skills.profile_id = profile.id
                  LIMIT 1
              )
            ) as prof INNER JOIN project AS proj
              ON prof.project_id = proj.id
          ) AS project_skills
          ON user_skills.skill_name = project_skills.skill_name
        GROUP BY profile_id
        ORDER BY project_id, profile_id;
        `;
        const params: any[] = [userID, userID];
        db_conn.query(colossalQuery, params, async (err: any, rows: any) => {
            if (err) {
                console.log(`Error while fetching matching projects from the database.\n${err}`);
                reject("500");
            } else {
                // project_id, project_name, profile_id, profile_name, skill_name, skill_weight, matches
                let matches: Array<ProjectMatch> = [];
                
                for (let i = 0; i < rows.length; i++){
                    // check if a new project has appeared (different from last registered project)
                    if (matches.length === 0 || matches[matches.length-1].project.id !== rows[i].project_id){
                        // new project, create new ProjectMatch
                        let newProjectmatch: ProjectMatch = {project: null, matches: null};
                        let newProfileMatches: Array<ProfileMatch> = [];

                        let newProject: Project = createProject(rows[i].project_id, rows[i].project_name);

                        // set project match values
                        newProjectmatch.project = newProject;
                        newProjectmatch.matches = newProfileMatches;

                        // add project match to result
                        matches.push(newProjectmatch);                        
                    }

                    // create new Profile match
                    let newProfileMatch: ProfileMatch = createProfileMatch(rows[i].profile_id, rows[i].profile_name);

                    // calculate profile matching percentage
                    // TODO: calculate percentage depending on # of matching skills  
                    // TODO: calculate percentage depending on difference required and possessed skill level  
                    // TODO: calculate percentage depending on weights  
                    let matchingPercentile: number = Math.ceil((rows[i].count_matching_skills / rows[i].count_skills) * 100);
                    newProfileMatch.matchingPercentile = matchingPercentile;

                    // add new profile to the last added array of profileMatches
                    let lastProfMatches = matches[matches.length-1].matches;
                    lastProfMatches.push(newProfileMatch);
                }

                resolve(matches);
            }
        });
    });
}


/**
 * Update existing project in the database.
 * @param projectID the id of the project that has to be updated
 * @param project the updated project
 */
function updateProject(projectID: number, project: Project): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'UPDATE project SET creator_id=?, name=?, status=?, pitch=?, created_at=?, edited_at=? WHERE id=?;';
            const params: any[] = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at, projectID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject("500");
                } else {
                    try{
                        for (let i=0; i < project.profiles.length; i++){
                            let profile: Profile = project.profiles[i];
                            await $profiles_methods.updateProfile(profile.id, profile);
                        }
                        resolve();
                    } catch (err) {
                        reject(err);
                    }                    
                }
            });
        }
    );
}


/**
 * Insert new project into the database. All profiles of the project will be added too.
 * @param project the new project
 * @returns the new id of the project that was inserted into the database.
 */
function addProject(project: Project): Promise<number>{
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "INSERT INTO project (creator_id, name, status, pitch, created_at, edited_at) VALUES (?,?,?,?,?,?);";
            const params: any[] = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject("500");
                } else {
                    try{
                        const newProjectID: number = await getProjectID(project);
                        for (let i = 0; i < project.profiles.length; i++){ // insert profiles into profile table
                            let newProfile: Profile = project.profiles[i];
                            newProfile.project_id = newProjectID;
                            await $profiles_methods.addProfile(newProfile);
                        }
                        resolve(newProjectID)
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }
    );    
}


/**
 * Delete project from the database.
 * @param projectID the id of the project that has to be deleted
 */
function deleteProject(projectID: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'DELETE FROM project WHERE id=?;';
            const params: any[] = [projectID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject("500");
                } else {
                    resolve();
                }
            });
        }
    );
}


/**
 * Get id of project from the database.
 * @param project the project of which the id will be searched for (type: Project)
 * @returns promise of the project's id (type: Promise<number>)
 */
function getProjectID(project: Project): Promise<number>{
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT id FROM project WHERE creator_id=? AND name=? AND created_at=?;';
            const params: any[] = [project.creator_id, project.name, project.created_at];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject("500");
                } else if (rows.length < 1) {
                    console.log("Could not find the id of the project.");
                    reject("404");
                } else {
                    const id: number = rows[0].id;
                    resolve(id);
                }
            });
        }
    );
}

module.exports = {
    getProject,
    getAllProjects,
    updateProject,
    getMatchingProjects,
    addProject,
    deleteProject
}
