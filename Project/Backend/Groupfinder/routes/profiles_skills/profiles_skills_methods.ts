const db_conn = require('../../databaseconnection');
import Skill from '../../types/skill';

/**
 * Get all skills of a profile.
 * @param profileID the id of the profile for which all skills will be searched.
 * @returns a list of all skills (type: Promise<Skill[]>)
 */
function getSkillsOfProfile(profileID: number): Promise<Skill[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "SELECT * FROM profile_skill WHERE profile_id=?;";
            const params: any[] = [profileID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let skills: Skill[] = [];
                    for (let i=0; i < rows.length; i++) {
                        let skill: Skill = {
                            name: rows[i].skill_name,
                            experience: rows[i].skill_experience,
                            weight: rows[i].weight
                        }
                        skills.push(skill);
                    }
                    resolve(skills)
                }
            });
        } 
    );
}


/**
 * Update a profile's skill in the database.
 * @param profileID the profile for which a skill will be updated
 * @param skill the updated skill
 */
function updateSkillOfProfile(profileID: number, skillName: string, skill: Skill): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "UPDATE profile_skill SET skill_experience=?, weight=? WHERE profile_id=? AND skill_name=?;";
            const params: any[] = [skill.experience, skill.weight, profileID, skillName];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        } 
    );
}


/**
 * Remove a skill from a profile.
 * An entry in the profile_skill table will be deleted.
 * The profile won't be deleted from the database.
 * @param profileID the profile for which a skill will be deleted
 * @param skillName the name of the skill to remove
 */
function removeSkillFromProfile(profileID: number, skillName: string): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "DELETE FROM profile_skill WHERE profile_id=? AND skill_name=?;";
            const params: any[] = [profileID, skillName];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        } 
    );
}


/**
 * Link a new skill to an existing project.
 * This method will insert a new entry in the profile_skill table.
 * @pre profileID is the id of an existing profile in the database.
 * @post the skill will be added to the profile
 */
function addSkillToProfile(profileID: number, skill: Skill): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "INSERT INTO profile_skill VALUES (?,?,?,?);";
            const params: any[] = [profileID, skill.name, skill.experience, skill.weight];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        }
    );
}

module.exports = {
    getSkillsOfProfile,
    removeSkillFromProfile,
    updateSkillOfProfile,
    addSkillToProfile
}