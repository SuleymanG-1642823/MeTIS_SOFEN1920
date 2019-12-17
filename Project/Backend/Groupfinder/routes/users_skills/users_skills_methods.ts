const db_conn = require('../../databaseconnection');
import Skill from '../../types/skill';

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

module.exports = {
    getSkillsOfUser
}