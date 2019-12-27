const db_conn = require('../../databaseconnection');
import User from '../../types/user';

/**
 * Adds a member to the profile of a project
 * @param user_id the id of the user
 * @param project_id the id of the project
 * @param profile_id the id of the profile
 */
function addMember(user_id: number, project_id: number, profile_id: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'INSERT INTO member (user_id, profile_id, project_id) VALUES (?,?,?);';
            const params: any[] = [user_id, profile_id, project_id];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            })
        }
    );
}


/**
 * Returns all the users that are a memver of this profile
 * @param profile_id the id of the profile
 * @returns A list of User objects containing all the users that are a member of this profile
 */
function getMembersProfile(profile_id: number): Promise<User[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT * FROM user LEFT JOIN member ON user.id=member.user_id WHERE member.profile_id=?;';
            const params: any[] = [profile_id];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let users: User[] = [];
                    for (let i = 0; i < rows.length; i++){
                        let user: User = {
                            id: rows[i].id,
                            first_name: rows[i].first_name,
                            last_name: rows[i].last_name,
                            mail: rows[i].mail,
                            address: rows[i].address,
                            zip: rows[i].zip,
                            city: rows[i].city,
                            tel: rows[i].tel,
                            website: rows[i].website,
                            social_media: rows[i].social_media,
                            available: rows[i].available,
                            private: rows[i].private
                        }
                        users.push(user);
                    }
                    resolve(users);
                }
            })
        }
    )
}


/**
 * Removes a member from a profile of a project
 * @param user_id The id of the user
 * @param project_id The id of the project
 * @param profile_id The id of the profile
 */
function deleteMember(user_id: number, project_id: number, profile_id: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'DELETE FROM member WHERE user_id=? AND profile_id=? AND project_id=?;';
            const params: any[] = [user_id, profile_id, project_id];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            })
        }
    )
}

module.exports = {
    addMember,
    getMembersProfile,
    deleteMember
}