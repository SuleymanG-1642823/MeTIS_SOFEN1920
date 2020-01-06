const db_conn = require('../../databaseconnection');
import User from '../../types/user';
import ProfileUserMatch from '../../types/matching/profileUserMatch';
import UsersToProjectMatcher from '../../classes/UsersToProjectMatcher';
let bcrypt = require('bcryptjs');

/**
 * Manage all interactions with users in the database
 */
export class UserController {
    /**
     * Get user with specific id from database
     * @param userID the id of the user that will be searched for
     */
    public getUser(userID: number): Promise<User> {
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
                        let social_media;
                        if (! row.social_media){
                            social_media = null;
                        } else {
                            const social_media_from_db: any[] = JSON.parse(row.social_media);
                            social_media = [];
                            for (let i = 0; i < social_media_from_db.length; i++){
                                social_media.push({
                                    prefix: social_media_from_db[i].prefix,
                                    suffix: social_media_from_db[i].suffix
                                })
                            }
                        }
                        
                        const user: User = {
                            id: row.id,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            is_admin: row.is_admin,
                            mail: row.mail,
                            address: row.addr,
                            zip: row.zip,
                            city: row.city,
                            tel: row.tel,
                            website: row.website,
                            social_media: social_media,
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
     * Returns users that have a matching percentage > 0 with the project that has the given id.
     * The matching percentage is always > 0 if there is at least one matching skill (user skill 
     * and profile skill) and the user skill experience is >= 1.
     * @param projectID: id of the project to find matches for.
     * @return a list of user/profile matches. Format:
     *      [
     *          {profile: profileObject, users: [userMatch1, ..., userMatchn]},
     *          ...
     *      ]
     * 
     *      ProfileObject contains information about a profile and userMatch contains a userObject
     *      along with the matching percentage.
     */
    public getMatchingUsers(projectID: number): Promise<any>{
        return new Promise(
            async (resolve: any, reject: any) => {
                try{
                    let result = await UsersToProjectMatcher.getMatchingUsers(projectID, db_conn);
                    resolve(result);
                }catch(err){
                    reject(500);
                }
    
            }
        );
    }

    /**
     * Returns the users that have the given string in their firstnames, lastnames or emails.
     * @param str 
     */
    public getUserSuggestions(str: string): Promise<User[]>{
        return new Promise( (resolve: any, reject: any) => {
            const query: string = `
                SELECT *
                FROM user
                WHERE	first_name LIKE concat('%', ?, '%')
                         OR last_name LIKE concat('%', ?, '%')
                        OR concat(first_name, ' ', last_name) LIKE concat('%', ?, '%')
                        OR mail LIKE concat('%', ?, '%');
            `;
    
            const params: any[] = [str, str, str, str];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } 
                else {
                    let userSuggestions: User[] = [];
    
                    // create a user object out of each rows
                    for (let user of rows){
                        const userSuggestion: User = {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            is_admin: user.is_admin,
                            mail: user.mail,
                            address: user.addr,
                            zip: user.zip,
                            city: user.city,
                            tel: user.tel,
                            website: user.website,
                            social_media: null, // TODO: parse social media json if necessary (now null because social media data is not needed for suggestions)
                            available: user.available,
                            private: user.private
                        }
                        userSuggestions.push(userSuggestion); // add user object to results
                    }
                    resolve(userSuggestions);
                }
            });    
        });
    }
    
    /**
     * Change data of existing user in the database.
     * @param userID the id of the user to be updated
     * @param user the updated user data
     */
    public updateUser(userID: number, user: User): Promise<void> {
        return new Promise(
            (resolve: any, reject: any) => {
                let social_media: string|null;
                if (user.social_media){
                    social_media = JSON.stringify(user.social_media);
                    
                    
                } else {
                    social_media = null;
                }
                
                const query: string = 'UPDATE user SET first_name=?, last_name=?, mail=?, addr=?, zip=?, city=?, tel=?, website=?, social_media=?, available=?, private=? WHERE id=?;';
                const params: any[] = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, social_media, user.available, user.private, userID];
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
    public addUser(user: User, hashedPassword: string): Promise<number> {
        return new Promise(
            (resolve: any, reject: any) => {
                let social_media: string|null;
                if (user.social_media){
                    social_media = JSON.stringify(user.social_media);
                } else {
                    social_media = null;
                }
    
                const query: string = 'INSERT INTO user (first_name, last_name, mail, is_admin, password, addr, zip, city, tel, website, social_media, available, private) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
                const params: any[] = [user.first_name, user.last_name, user.mail, user.is_admin, hashedPassword ,user.address, user.zip, user.city, user.tel, user.website, social_media, user.available, user.private];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err){
                        console.log(err);
                        reject('500');
                    } else {
                        try{
                            const new_id: number = await this.getNewID(user);
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
    public deleteUser(userID: number): Promise<void> {
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
    private getNewID(user: User): Promise<number>{
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
    public changePassword(userID: number, plainTextPassword: string): Promise<void>{
        return new Promise(
            async (resolve: any, reject: any) => {
                const hashedPassword: string = await this.hashPassword(plainTextPassword);
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
    public validatePassword(userID: number, plainTextPassword: string): Promise<boolean> {
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
    private hashPassword(plainTextPassword: string): Promise<string>{
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

    /**
 * Get user with specific mail address from database
 * @param mail the mail address of the user that will be searched for
 */
public getUserForLogin(mail: string): Promise<User> {
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
                        password: row.password,
                        is_admin: row.is_admin,
                        first_name: row.first_name,
                        last_name: row.last_name,
                        mail: row.mail,
                        address: row.address,
                        zip: row.zip,
                        city: row.city,
                        tel: row.tel,
                        website: row.website,
                        social_media: JSON.parse(row.social_media),
                        available: row.available,
                        private: row.private
                    }
                    resolve(user);
                }
            });
        }
    );
}

public userExists(mail: string): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
        const query: string = 'SELECT * FROM user WHERE mail=?;';
        const params: any[] = [mail];
        db_conn.query(query, params, (err: any, rows: any) => {
            if (err){
                console.log(err);
                reject('500');
            } 
            else if (rows.length > 0) {
                console.log(`User already exists for mail=${mail}`)
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
}