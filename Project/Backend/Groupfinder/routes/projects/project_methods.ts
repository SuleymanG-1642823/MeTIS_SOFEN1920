const db_conn = require('../../databaseconnection');
const moment = require('moment');
import Project from '../../types/project';
import Profile from '../../types/profile';
import ProjectMatch from '../../types/projectMatch';
import ProfileMatch from '../../types/profileMatch';
const $profiles_methods = require('../profiles/profiles_methods');

/**
 * Get project with specific ID from the database.
 * The project won't contain any profile, only the project table will be accessed.
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
                        //const profiles_result: Profile[] = await $profiles_methods.getProjectProfiles(rows[0].projectID);
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
                            //profiles: profiles_result
                            profiles: []
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
 * The projects won't contain any profile, only the project table will be accessed.
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
                        //const profiles_result: Profile[] = await $profiles_methods.getProjectProfiles(rows[i].projectID);
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
                            //profiles: profiles_result
                            profiles: []
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
 * Get all projects from the database where userID is the id of the owner of the project.
 * @param userID the id of the owner of the projects
 */
function getAllProjectsOfOwner(userID: number): Promise<Project[]>{
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "SELECT project.id AS projectID, name, status, pitch, created_at, edited_at, user.id AS userID, user.first_name, user.last_name  FROM project JOIN user ON user.id=project.creator_id WHERE project.creator_id=?;";
            const params: number[] = [userID];
            db_conn.query(query, params, (err: any, rows: any[]) => {
                if (err){
                    console.log(err);
                    reject('500');
                } else {
                    let projects: Project[] = [];
                    for (let i=0; i < rows.length; i++){
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
                            //profiles: profiles_result
                            profiles: []
                        }
                        projects.push(project);
                    }
                    resolve(projects);
                }
            });
        }
    )
}

/**
 * Get all projects from the database where user with userID is a member (not the owner) of the project.
 * @param userID the id of the user
 */
function getAllProjectsWithMember(userID: number): Promise<Project[]>{
    return new Promise(
        (resolve: any, reject: any) => {
            const select: string = "SELECT p.id AS project_id, p.name, p.pitch, p.status, p.created_at, p.edited_at, u.id AS user_id, u.first_name, u.last_name ";
            const from: string = "FROM member AS m JOIN project AS p ON m.project_id = p.id JOIN user AS u ON p.creator_id = u.id ";
            const where: string = "WHERE m.user_id = ?;";
            const query: string = select + from + where;
            const params: number[] = [userID];
            db_conn.query(query, params, (err: any, rows: any[]) => {
                if (err){
                    console.log(err);
                    reject('500');
                } else {
                    let projects: Project[] = [];
                    for (let i=0; i < rows.length; i++){
                        let project: Project = {
                            id: rows[i].project_id,
                            name: rows[i].name,
                            status: rows[i].status,
                            pitch: rows[i].pitch,
                            created_at: moment(rows[i].created_at).format('YYYY-MM-DD hh:mm:ss'),
                            edited_at: moment(rows[i].edited_at).format('YYYY-MM-DD hh:mm:ss'),
                            creator_id: rows[i].user_id,
                            creator_first_name: rows[i].first_name,
                            creator_last_name: rows[i].last_name,
                            //profiles: profiles_result
                            profiles: []
                        }
                        projects.push(project);
                    }
                    resolve(projects);
                }
            });
        }
    )
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

    /*
        Sorts Projects in decending maximum matching percentile and profiles in decending matching percentile
        @pre: every project must have at least 1 profile
    */
    function sortMatches(matches: Array<ProjectMatch>): Array<ProjectMatch>{
        // sort profiles per project
        for (let projMatchIndex in matches){ 
            matches[projMatchIndex].matches = matches[projMatchIndex].matches.sort((profileMatch1, profileMatch2) => profileMatch2.matchingPercentile - profileMatch1.matchingPercentile);
        }

        // sort projects according to their maximum profile matching percentage
        matches.sort((projectMatch1, projectMatch2) => projectMatch2.matches[0].matchingPercentile - projectMatch1.matches[0].matchingPercentile);

        return matches;
    } 

    interface ProfileMatch {
        profileID: number,
        profileName: String,
        matchingPercentile: number
    }
    /**
     * Creates a new ProfileMatch object (also calculates the matching percentage).
     * @param rows Contains all rows from the query of a single profile.
     * @pre "rows" must contain all rows of 1 project, if not the contents of the created ProfileMatch object
     *      won't be correct.
     * @pre Each profile in the output of the query (input param "rows") must contain at least 1 profile_skill.
     */
    function createMatchingProfile(rows: Array<any>): ProfileMatch{
        // rows: project_id, project_name, profile_id, profile_name, skill_name, skill_experience, skill_weight, matches
        // create the matching profile object
        let newProfileMatch: ProfileMatch = createProfileMatch(rows[0].profile_id, rows[0].profile_name);

        // TODO: experience
        // TODO: weights
        // count the number of matching skills en total skills, then calculate the matching percentage
        let totalSkills = 0;
        let totalMatchingSkills = 0;

        for (let row of rows){
            totalSkills += row.skill_weight;

            if (row.matches === 1) // means matches with one of the users' skills
            {
                // TODO: if user has the required skill experience, # of matching skills is increased by 1
                // otherwise the # of matching skills is increased by the percentage of which the users' skill
                // covers the required skill for example: user skill = 1, required skill = 2, 1 is 50% of 2 so
                // # of matching skills is increased by 0.5 (50%).
                // NOTE: first add the column for the users' experience, so you can use it here
                let addedValue = 1;

                // the weight is calculated by multiplying the added amount by the weight itself to the # of matching skills 
                // and # of tot skills. The added amount is determined by skill experience (1 or a percentage (max 1)). 
                let weightedAddedValue = addedValue*row.skill_weight;

                // update value
                totalMatchingSkills += weightedAddedValue;
            }
        }

        // matching percentage
        newProfileMatch.matchingPercentile = Math.ceil((totalMatchingSkills / totalSkills) * 100);
        return newProfileMatch;
    }

    /**
     * Creates a new ProjectMatch object that contains a list of ProfileMatch objects.
     * @param rows: Contains all rows from the query of a single project.
     * @pre "rows" must contain all rows of 1 project, the contents are calculated according to given data.
     *      If the rows of the same project are passed separately there will be a ProjectMatch object created
     *      for each call of this function and the contents of those ProjectMatch objects won't be correct.
     * @pre Each project in the output of the query (input param "rows") must contain at least 1 profile.
     *  */
    function createMatchingProject(rows: Array<any>): ProjectMatch{
        let profileRows: Array<any> = [];
        let profileMatches: Array<ProfileMatch> = [];

        // create ProjectMatch object
        let newProjectMatch: ProjectMatch = {
            project: createProject(rows[0].profile_id, rows[0].profile_name),
            matches: null
        }

        // cumulate rows of the same profile, and create a ProfileMatch object with each set of rows
        for (let i in rows){
            // check if current profile is a new one
            if (profileRows.length === 0 || profileRows[profileRows.length-1].profile_id !== rows[i].profile_id){
                // if there are cumulated rows then we have all the rows of one profile, make a ProfileMatch object
                if (profileRows.length > 0){
                    profileMatches.push(createMatchingProfile(profileRows));
                    profileRows = [];
                }
            }

            // add current rows to list
            profileRows.push(rows[i]);
        }

        // if there is a cumulated set of rows remaining, make a ProfileMatch out of those
        if (profileRows.length > 0){
            profileMatches.push(createMatchingProfile(profileRows));
        }

        // add profile matches list to ProjectMatch object
        newProjectMatch.matches = profileMatches;

        return newProjectMatch;
    }

    return new Promise((resolve: any, reject: any) => {
        // rows: project_id, project_name, profile_id, profile_name, skill_name, skill_experience, skill_weight, matches
        /* TODO
            PROBLEM: profiles with no matching skills are not selected so that means the following
                  scenario is true: let A be a project and let bb and cc be A's profiles,
                  if bb has matching skills with the user and cc does not, then cc won't be selected. 
            SOLUTION: query all profiles (that belong to one of the projects returned by the query below) that don't have 
                      matching skills and take the union of that with the query below.
        */
        const colossalQuery: string = `
        SELECT project_skills.*, not IsNull(user_skills.id) as matches
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
        ORDER BY project_id, profile_id;
        `;
        const params: any[] = [userID, userID];
        db_conn.query(colossalQuery, params, async (err: any, rows: any) => {
            if (err) {
                console.log(`Error while fetching matching projects from the database.\n${err}`);
                reject("500");
            } else {
                // project_id, project_name, profile_id, profile_name, skill_name, skill_experience, skill_weight, matches
                let matches: Array<ProjectMatch> = [];
                let projectRows: Array<any> = [];
                let projectMatches: Array<ProjectMatch> = [];

                // cumulate rows of the same project, and create a ProjectMatch object with each set of rows
                for (let i in rows){
                    // check if current project is a new one
                    if (projectRows.length === 0 || projectRows[projectRows.length-1].project_id !== rows[i].project_id){
                        // if there are cumulated rows then we have all the rows of one profile, make a ProfileMatch object
                        if (projectRows.length > 0){
                            projectMatches.push(createMatchingProject(projectRows));
                            projectRows = [];
                        }
                    }

                    // add current rows to list
                    projectRows.push(rows[i]);
                }

                // if there is a cumulated set of rows remaining, make a ProjectMatch out of those
                if (projectRows.length > 0){
                    projectMatches.push(createMatchingProject(projectRows));
                }

                resolve(projectMatches);
                // resolve(sortMatches(matches));
            }
        });
    });
}


/**
 * Update existing project in the database.
 * The profiles of the skill won't be updated.
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
                    resolve();
                    /*try{
                        for (let i=0; i < project.profiles.length; i++){
                            let profile: Profile = project.profiles[i];
                            await $profiles_methods.updateProfile(profile.id, profile);
                        }
                        resolve();
                    } catch (err) {
                        reject(err);
                    }*/                 
                }
            });
        }
    );
}


/**
 * Insert new project into the database.
 * The profiles of the project won't be inserted into the database.
 * @param project the new project
 * @returns the new id of the project that was inserted into the database.
 */
function addProject(project: Project): Promise<number>{
    return new Promise(
        (resolve: any, reject: any) => {
            console.log(project);
            const query: string = "INSERT INTO project (creator_id, name, status, pitch, created_at, edited_at) VALUES (?,?,?,?,?,?);";
            const params: any[] = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject("500");
                } else {
                    try{
                        const newProjectID: number = await getProjectID(project);
                        /*for (let i = 0; i < project.profiles.length; i++){ // insert profiles into profile table
                            let newProfile: Profile = project.profiles[i];
                            newProfile.project_id = newProjectID;
                            await $profiles_methods.addProfile(newProfile);
                        }*/
                        console.log("Sucessfully inserted project");
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
 * All profiles of the project will automatically be deleted too (because of the foreign key constrains in the database)
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
    getAllProjectsOfOwner,
    getAllProjectsWithMember,
    updateProject,
    getMatchingProjects,
    addProject,
    deleteProject
}
