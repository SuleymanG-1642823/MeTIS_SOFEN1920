import ProfileUserMatch from '../types/matching/profileUserMatch';
import Profile from '../types/profile';
import UserMatch from '../types/matching/userMatch';
import ProfileSkill from '../types/profileSkill';

export default class UsersToProjectMatcher{

    /**
     * Returns table with columns:
     *     profile_id	profile_name	profile_skill_name	profile_skill_experience	skill_weight	user_id	first_name	last_name	user_skill_experience
     * 
     * The rows are sorted by profile then by name, so per profile you first get all rows of one user with matching skills then
     * you get the rows of for the same profile (if there are users left) the rows of the next user with matching skills. Example:
     *
     * -----------------------------------------------------------------------------------------------------------------------
     * |profile_id  profile_name                profile_skill_name  user_id first_name  last_name   user_skill_experience    |
     * -----------------------------------------------------------------------------------------------------------------------
     * |6	        Software engineer windows	AGILE	   	        6	    Robert	    Louwes	    5                        |
     * |6	        Software engineer windows	C++	       	        6	    Robert	    Louwes	    7                        |
     * |6	        Software engineer windows	AGILE	   	        5	    Willem	    Kreijkes	5                        |
     * |6	        Software engineer windows	C++	       	        5	    Willem	    Kreijkes	7                        |
     * |7	        Software engineer linux	    C++	       	        6	    Robert	    Louwes	    7                        |
     * |7	        Software engineer linux	    Linux OS	        6	    Robert	    Louwes	    3                        |
     * |7	        Software engineer linux	    AGILE	   	        6	    Robert	    Louwes	    5                        |
     * |7	        Software engineer linux	    AGILE	   	        5	    Willem	    Kreijkes	5                        |
     * |7	        Software engineer linux	    C++	       	        5	    Willem	    Kreijkes	7                        |
     * -----------------------------------------------------------------------------------------------------------------------
     */
    private static queryMatchingUserSkills: string = `
        select project_skills.*, user_skills.user_id, first_name, last_name, user_skills.user_skill_experience
        from
            (
                select profile.id profile_id, profile.name profile_name, prosk.skill_name profile_skill_name, prosk.skill_experience profile_skill_experience, prosk.weight skill_weight
                  from project, profile, profile_skill prosk
                  where prosk.profile_id = profile.id
                      and profile.project_id = project.id
                      and project.id = ?
                  order by profile_id
            ) as project_skills
            inner join
            (
                select user.id user_id, concat(user.first_name, ' ', user.last_name) user_name, skill_name  user_skill_name, skill_experience user_skill_experience, user.first_name, user.last_name
                  from user join user_skill on user_skill.user_id = user.id 
            ) user_skills
            on project_skills.profile_skill_name = user_skills.user_skill_name
        order by profile_id, user_name
    `;

    /**
     * Returns all profiles along with all profile_skills of one project
     */
    private static queryProjectSkills: string = `
        select profile.id profile_id, profile.name profile_name, prosk.skill_name profile_skill_name, prosk.skill_experience profile_skill_experience, prosk.weight skill_weight
        from project, profile, profile_skill prosk
        where prosk.profile_id = profile.id
            and profile.project_id = project.id
            and project.id = ?
        order by profile_id
    `;

    /**
     * Creates a Profile object and returns it
     * @param id 
     * @param name 
     * @param projectID 
     */
    private static createNewProfile(id: number, name: string, projectID: number){
        return {
            id: id,
            name: name,
            project_id: projectID
        }
    }

    /**
     * Makes a list of (profile, profile_skills) elements where profile is a profile object
     * and profile_skills is a list of corresponding skills.
     * @param rows: result of the query queryProjectSkills
     * @param projectID: ID of the project the profiles (in rows) belong to
     * @returns as described above
     */
    private static preprocessProfileSkills(rows: any, projectID: number): Array<{profile: Profile, skills: Array<ProfileSkill>}>{
        // Got profile and skill rows of the project, preprocess the rows into a list.
        // The list contains elements each having a profile and a list of skills.
        let cumulatedSkills: Array<ProfileSkill> = [];
        let profiles: Array<{profile: Profile, skills: Array<ProfileSkill>}> = [];
        let currentProdileID: number = null; // this is used to check if a new profile has been encountered

        // assign first profile id
        if (rows.length > 0){
            currentProdileID = rows[0].profile_id;
        }

        // Rows are sorted by profile, so collect all profile skills and when you encounter a new profile
        // add old profile and collected skills into the list profiles.
        for (let i = 0; i < rows.length; i++){
            // check if current profile is a new one
            if (currentProdileID !== rows[i].profile_id){
                // At this point i must be at least 1 because currentProfileID is initially set
                // to the profile id in the first row so the if statement above is going to be 
                // always false in the first iteration. Therefore we can check rows[i-1] without
                // a problem.

                // add current profile and reset cumulatedSkills
                let newProfile: Profile = this.createNewProfile(rows[i-1].profile_id, rows[i-1].profile_name, projectID); 

                // add profile to list
                profiles.push({profile: newProfile, skills: cumulatedSkills});

                // reset cumulated skills and update current id
                cumulatedSkills = [];
                currentProdileID = rows[i].profile_id;
            }

            // add current skill to cumulated skills
            let newProfileSkill: ProfileSkill = {
                name: rows[i].profile_skill_name,
                experience: rows[i].profile_skill_experience,
                weigth: rows[i].skill_weight
            }

            cumulatedSkills.push(newProfileSkill);
        }

        // if there are some unadded skills, make a profile for those and add it
        if (cumulatedSkills.length > 0){
            // make a profile with the information in the last row
            let lastIndex = rows.length - 1;
            let newProfile: Profile = this.createNewProfile(rows[lastIndex].profile_id, rows[lastIndex].profile_name, projectID); 
            profiles.push({profile: newProfile, skills: cumulatedSkills});
            cumulatedSkills = []; // reset so that the last added list cannot be accidentally edited after this
        }

        return profiles;
    }

    /**
     * 
     * @param projectID 
     * @param dbconn 
     */
    //Promise<Array<ProfileUserMatch>>
    static getMatchingUsers(projectID: number, dbconn: any): Promise<any>{
        return new Promise((resolve: any, reject: any) => {
            const params: any[] = [projectID];
            dbconn.query(this.queryProjectSkills, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(`Error while fetching matching projects from the database.\n${err}`);
                    reject("500");
                } else {
                    let profiles: Array<{profile: Profile, skills: Array<ProfileSkill>}> = this.preprocessProfileSkills(rows, projectID)
                    resolve(profiles);
                }
            });
        });
    }

}