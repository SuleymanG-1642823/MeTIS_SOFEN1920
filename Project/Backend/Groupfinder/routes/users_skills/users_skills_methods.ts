const db_conn = require('../../databaseconnection');
import Skill from '../../types/skill';

/**
 * Get all skills of a user
 * @param userID the id of the user whose skills will be searched for.
 */
function getSkillsOfUser(userID: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "SELECT * FROM user_skill WHERE user_id=?;";
            const params: any[] = [userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let skills: Skill[] = [];
                    for (let i=0; i < rows.length; i++){
                        let skill: Skill = {
                            name: rows[i].skill_name,
                            experience: rows[i].skill_experience,
                            weight: null
                        }
                        skills.push(skill);
                    }
                    resolve(skills);
                }
            });
        }
    );
}


/**
 * Update a user's skill
 * @param userID 
 * @param skill_name 
 */
function updateSkill(userID: number, skill_name: string, newSkill: Skill): Promise<void> {
    return new Promise(
        (resolve, reject) => {
            const query: string = "UPDATE user_skill SET skill_name=?, skill_experience=? WHERE user_id=? AND skill_name=?;";
            const params: any[] = [newSkill.name, newSkill.experience, userID, skill_name];
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
 * Delete a user's skill from the database.
 * @param userID a skill of the user with userID as id will be deleted
 * @param skill_name the name of the skill that will be deleted
 */
function removeSkill(userID: number, skill_name: string): Promise<void> {
    return new Promise(
        (resolve, reject) => {
            const query: string = "DELETE FROM user_skill WHERE user_id=? AND skill_name=?;";
            const params: any[] = [userID, skill_name];
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
 * Add a skill into the database.
 * @param userID skill will be linked to the user with id userID
 * @param skill the new data of the skill
 */
function addSkill(userID: number, skill: Skill): Promise<void> {
    return new Promise(
        (resolve, reject) => {
            const query: string = "INSERT INTO user_skill VALUES (?,?,?);";
            const params: any[] = [userID, skill.name, skill.experience];
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
    getSkillsOfUser,
    updateSkill,
    removeSkill,
    addSkill
}