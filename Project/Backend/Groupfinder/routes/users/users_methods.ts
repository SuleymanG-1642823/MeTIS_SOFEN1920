const db_conn = require('../../databaseconnection');
import User from '../../types/user';
let bcrypt = require('bcryptjs');

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
                        address: row.addr,
                        zip: row.zip,
                        city: row.city,
                        tel: row.tel,
                        website: row.website,
                        social_media: row.social_media,
                        available: row.available,
                        private: row.private
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
            const query: string = 'UPDATE user SET first_name=?, last_name=?, mail=?, addr=?, zip=?, city=?, tel=?, website=?, social_media=?, available=?, private=? WHERE id=?;';
            const params: any[] = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, user.social_media, user.available, user.private, userID];
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
 * @param hashedPassword the new password (hashed)
 */
function addUser(user: User, hashedPassword: string): Promise<number> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'INSERT INTO user (first_name, last_name, mail, password, addr, zip, city, tel, website, social_media, available, private) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
            const params: any[] = [user.first_name, user.last_name, user.mail, hashedPassword ,user.address, user.zip, user.city, user.tel, user.website, user.social_media, user.available, user.private];
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
 * Change a user's password in the database.
 * @param userID the id of the user whose password will be changed
 * @param hashedPassword the new hashed password
 */
function changePassword(userID: number, plainTextPassword: string): Promise<void>{
    return new Promise(
        async (resolve: any, reject: any) => {
            const hashedPassword: string = await hashPassword(plainTextPassword);
            const query: string = "UPDATE user SET password=? WHERE id=?;";
            const params: any[] = [hashedPassword, userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if(err){
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
 * Check if user's password is correct
 * @param userID the id of the user whose password will be checked
 * @param hashedPassword the hashed password of the user
 */
function validatePassword(userID: number, plainTextPassword: string): Promise<boolean> {
    return new Promise(
        (resolve, reject) => {
            const query: string = "SELECT password FROM user WHERE id=?;";
            const params: any[] = [userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if(err){
                    console.log(err);
                    reject('500');
                } else if (rows.length <= 0){
                    console.log("Could not find password of user");
                    reject('404');
                } else {
                    bcrypt.compare(plainTextPassword, rows[0].password, function(err: any, valid: boolean) {
                        resolve(valid);
                    });
                }
            });
        }
    );
}


/**
 * Hash a password.
 * @param password the plain text password to be hashed
 */
function hashPassword(plainTextPassword: string): Promise<string>{
    return new Promise(
        (resolve, reject) => {
            bcrypt.genSalt(10, function(err: any, salt: any) {
                bcrypt.hash(plainTextPassword, salt, function(err: any, hash: any) {
                    if (err){
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                });
            });
        }
    );
}


module.exports = {
    getUser,
    updateUser,
    addUser,
    deleteUser,
    changePassword,
    validatePassword
}