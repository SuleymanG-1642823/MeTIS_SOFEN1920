"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_conn = require('../../databaseconnection');
/**
 * Get user with specific id from database
 * @param userID the id of the user that will be searched for
 */
function getUser(userID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE id=?;';
        const params = [userID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log(`Error finding user with id=${userID}`);
                reject('404');
            }
            else {
                const row = rows[0];
                const user = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    mail: row.mail,
                    address: row.addr,
                    zip: row.zip,
                    city: row.city,
                    tel: row.tel,
                    website: row.website,
                    social_media: row.social_media
                };
                resolve(user);
            }
        });
    });
}
/**
 * Change data of existing user in the database.
 * @param userID the id of the user to be updated
 * @param user the updated user data
 */
function updateUser(userID, user) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET first_name=?, last_name=?, mail=?, addr=?, zip=?, city=?, tel=?, website=?, social_media=? WHERE id=?;';
        const params = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, user.social_media, userID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                resolve();
            }
        });
    });
}
/**
 * Insert new user into database
 * @param user the new user that will be added
 */
function addUser(user) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user (first_name, last_name, mail, addr, zip, city, tel, website, social_media) VALUES (?,?,?,?,?,?,?,?,?);';
        const params = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, user.social_media];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                try {
                    const new_id = yield getNewID(user);
                    resolve(new_id);
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Delete user from the database.
 * @param userID the id of the user that has to be deleted
 */
function deleteUser(userID) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM user WHERE id=?;';
        const params = [userID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                resolve();
            }
        });
    });
}
/**
 * Get id of user from database.
 * @param user The user whose id will be searched for. (type: User)
 * @returns promise of the user's id (type: Promise<number>)
 */
function getNewID(user) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM user WHERE mail=?;';
        const params = [user.mail];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log('Could not find the id of a user.');
                reject('404');
            }
            else {
                const id = rows[0].id;
                resolve(id);
            }
        });
    });
}
module.exports = {
    getUser,
    updateUser,
    addUser,
    deleteUser
};
//# sourceMappingURL=users_methods.js.map