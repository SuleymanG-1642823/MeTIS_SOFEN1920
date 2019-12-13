import Project from './../types/project'
import ProjectMatch from '../types/matching/projectMatch'
import ProfileMatch from '../types/matching/profileMatch';


export default class ProjectsToUserMatcher{
    private static query = `
    SELECT project_skills.project_id, project_skills.project_name, project_skills.profile_id, project_skills.profile_name, 
            project_skills.skill_name AS profile_skill_name, project_skills.skill_experience AS profile_skill_experience, project_skills.skill_weight AS profile_skill_weight,
            not IsNull(user_skills.id) AS matches, user_skills.skill_experience as user_skill_experience
    FROM 
      (
        SELECT skill_name, user.id, skill_experience
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

    /**
     * Get matching projects for the user from the database.
     * @param userID ID of the user to find project matches for
     * @param dbconn A mysql connection object created with mysql.createConnection()
     * @pre dbconn must be a valid connection. It must be ready to execute queries.
     * @returns A list of projectMatch objects in json format
     */
    public static getMatchingProjects(userID: number, dbconn: any): Promise<Array<ProjectMatch>>{
        return new Promise((resolve: any, reject: any) => {
            // rows: project_id	project_name profile_id	profile_name profile_skill_name profile_skill_experience profile_skill_weight matches user_skill_experience
            const params: any[] = [userID, userID];
            dbconn.query(this.query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(`Error while fetching matching projects from the database.\n${err}`);
                    reject("500");
                } else {
                    // project_id, project_name, profile_id, profile_name, skill_name, skill_experience, skill_weight, matches
                    let projectRows: Array<any> = [];
                    let projectMatches: Array<ProjectMatch> = [];
    
                    // cumulate rows of the same project, and create a ProjectMatch object with each set of rows
                    for (let i in rows){
                        // check if current project is a new one
                        if (projectRows.length > 0 && projectRows[projectRows.length-1].project_id !== rows[i].project_id){
                            // if there are cumulated rows then we have all the rows of one profile, make a ProfileMatch object
                            projectMatches.push(this.createMatchingProject(projectRows));
                            projectRows = [];
                        }
    
                        // add current rows to list
                        projectRows.push(rows[i]);
                    }
    
                    // if there is a cumulated set of rows remaining, make a ProjectMatch out of those
                    if (projectRows.length > 0){
                        projectMatches.push(this.createMatchingProject(projectRows));
                    }

                    resolve(this.sortMatches(projectMatches));
                }
            });
        });
    }

    /**
     * Returns a project instance. It makes an instance of an object that implements the project interface.
     * @param projectID
     * @param projectName 
     */
    private static createProject(projectID: number, projectName: string): Project{
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


    /**
     * Creates a ProfileMatch instance
     * @param profileID 
     * @param profileName 
     */
    private static createProfileMatch(profileID: number, profileName: string){
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
        @post the given parameter is sorted
        @post the given parameter is returned;
    */
    private static sortMatches(matches: Array<ProjectMatch>): Array<ProjectMatch>{
        // sort profiles per project
        for (let projMatchIndex in matches){ 
            matches[projMatchIndex].matches = matches[projMatchIndex].matches.sort((profileMatch1, profileMatch2) => profileMatch2.matchingPercentile - profileMatch1.matchingPercentile);
        }

        // sort projects according to their maximum profile matching percentage
        matches.sort((projectMatch1, projectMatch2) => projectMatch2.matches[0].matchingPercentile - projectMatch1.matches[0].matchingPercentile);

        return matches;
    }

    /**
     * Creates a new ProfileMatch object (also calculates the matching percentage).
     * @param rows Contains all rows from the query of a single profile.
     * @pre "rows" must contain all rows of 1 project, if not the contents of the created ProfileMatch object
     *      won't be correct.
     * @pre Each profile in the output of the query (input param "rows") must contain at least 1 profile_skill.
     */
    private static createMatchingProfile(rows: Array<any>): ProfileMatch{
        // rows: project_id	project_name	profile_id	profile_name	profile_skill_name	profile_skill_experience	profile_skill_weight	matches	user_skill_experience
        // create the matching profile object
        let newProfileMatch: ProfileMatch = this.createProfileMatch(rows[0].profile_id, rows[0].profile_name);

        // TODO: experience
        // TODO: weights
        // count the number of matching skills en total skills, then calculate the matching percentage
        let totalSkills = 0;
        let totalMatchingSkills = 0;

        for (let row of rows){
            totalSkills += row.profile_skill_weight;

            if (row.matches === 1) // means matches with one of the users' skills
            {
                // TODO: if user has the required skill experience, # of matching skills is increased by 1
                // otherwise the # of matching skills is increased by the percentage of which the users' skill
                // covers the required skill for example: user skill = 1, required skill = 2, 1 is 50% of 2 so
                // # of matching skills is increased by 0.5 (50%).
                // NOTE: first add the column for the users' experience, so you can use it here
                let addedValue = 1;
                if (row.user_skill_experience < row.profile_skill_experience){
                    addedValue = row.user_skill_experience / row.profile_skill_experience;
                }

                // the weight is calculated by multiplying the added amount by the weight itself to the # of matching skills 
                // and # of tot skills. The added amount is determined by skill experience (1 or a percentage (max 1)). 
                let weightedAddedValue = addedValue*row.profile_skill_weight;

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
    private static createMatchingProject(rows: Array<any>): ProjectMatch{
        let profileRows: Array<any> = [];
        let profileMatches: Array<ProfileMatch> = [];

        // create ProjectMatch object
        let newProjectMatch: ProjectMatch = {
            project: this.createProject(rows[0].project_id, rows[0].project_name),
            matches: null
        }

        // cumulate rows of the same profile, and create a ProfileMatch object with each set of rows
        for (let i in rows){
            // check if current profile is a new one
            if (profileRows.length === 0 || profileRows[profileRows.length-1].profile_id !== rows[i].profile_id){
                // if there are cumulated rows then we have all the rows of one profile, make a ProfileMatch object
                if (profileRows.length > 0){
                    profileMatches.push(this.createMatchingProfile(profileRows));
                    profileRows = [];
                }
            }

            // add current rows to list
            profileRows.push(rows[i]);
        }

        // if there is a cumulated set of rows remaining, make a ProfileMatch out of those
        if (profileRows.length > 0){
            profileMatches.push(this.createMatchingProfile(profileRows));
        }

        // add profile matches list to ProjectMatch object
        newProjectMatch.matches = profileMatches;

        return newProjectMatch;
    }
}