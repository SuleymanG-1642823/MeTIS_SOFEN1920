const db_conn = require('../../databaseconnection');
import User from '../../types/user';


/**
 * Get user with specific id from database
 * @param userID the id of the user that will be searched for
 */
function getUser(userID: number): Promise<User> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT * FROM user WHERE id=?;';
            const params: any[] = [userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } 
                else if (rows.length < 1) {
                    console.log(`Error finding user with id=${userID}`)
                    reject('404');
                } else {
                    const row = rows[0];
                    const user: User = {
                        id: row.id,
                        first_name: row.first_name,
                        last_name: row.last_name,
                        mail: row.mail,
                        zip: row.zip,
                        city: row.city,
                        tel: row.tel,
                        website: row.website,
                        social_media: row.social_media
                    }
                    resolve(user);
                }
            });
        }
    );
}


/**
 * Change data of existing user in the database.
 * @param userID the id of the user to be updated
 * @param user the updated user data
 */
function updateUser(userID: number, user: User): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'UPDATE user SET first_name=?, last_name=?, mail=?, zip=?, city=?, tel=?, website=?, social_media=? WHERE id=?;';
            const params: any[] = [user.first_name, user.last_name, user.mail, user.zip, user.city, user.tel, user.website, user.social_media, userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } else {
                    resolve()
                }
            });
        }
    );
}

/**
 * Insert new user into database
 * @param user the new user that will be added
 */
function addUser(user: User): Promise<number> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'INSERT INTO user (first_name, last_name, mail, zip, city, tel, website, social_media) VALUES (?,?,?,?,?,?,?,?,?);';
            const params: any[] = [user.first_name, user.last_name, user.mail, user.zip, user.city, user.tel, user.website, user.social_media];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        const new_id: number = await getNewID(user);
                        resolve(new_id)
                    }
                    catch (err){
                        reject(err);
                    }
                }
            });
        }
    );
}


/**
 * Delete user from the database.
 * @param userID the id of the user that has to be deleted
 */
function deleteUser(userID: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'DELETE FROM user WHERE id=?;';
            const params: any[] = [userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
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
 * Get id of user from database.
 * @param user The user whose id will be searched for. (type: User)
 * @returns promise of the user's id (type: Promise<number>)
 */
function getNewID(user: User): Promise<number>{
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT id FROM user WHERE mail=? ORDER BY id DESC;';
            const params: any[] = [user.mail];
            db_conn.query(query, params, (err: any, rows: any) => {
                if(err){
                    console.log(err);
                    reject('500');
                } else if (rows.length < 1){
                    console.log('Could not find the id of a user.');
                    reject('404');
                } else {
                    const id: number = rows[0].id;
                    resolve(id);
                }
            });
        }
    );
}

/**
 * Get user with specific mail address from database
 * @param mail the mail address of the user that will be searched for
 */
function getUserForLogin(mail: string): Promise<User> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT * FROM user WHERE mail=?;';
            const params: any[] = [mail];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } 
                else if (rows.length < 1) {
                    console.log(`Error finding user with mail=${mail}`)
                    //reject('404');
                    resolve();
                } else {
                    const row = rows[0];
                    const user: User = {
                        id: row.id,
                        pw_hash: row.pw_hash,
                        is_admin: row.is_admin,
                        first_name: row.first_name,
                        last_name: row.last_name,
                        mail: row.mail,
                        zip: row.zip,
                        city: row.city,
                        tel: row.tel,
                        website: row.website,
                        social_media: JSON.parse(row.social_media)
                    }
                    resolve(user);
                }
            });
        }
    );
}
module.exports = {
    getUser,
    updateUser,
    addUser,
    deleteUser,
    getUserForLogin
}