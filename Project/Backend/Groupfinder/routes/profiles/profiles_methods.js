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
 * Get all profiles of a project.
 * @param projectID search for all profiles of the project with projectID as ID
 */
function getProjectProfiles(projectID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM profile WHERE project_id=?;';
        const params = [projectID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject("500");
            }
            else {
                let profiles = [];
                for (let i = 0; i < rows.length; i++) {
                    let profile = {
                        id: rows[i].id,
                        name: rows[i].name,
                        project_id: projectID
                    };
                    profiles.push(profile);
                }
                resolve(profiles);
            }
        });
    });
}
/**
 * Update existing profile in the database.
 * @param profileID the id of the profile to be updated
 * @param profile new data of the profile
 */
function updateProfile(profileID, profile) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE profile SET name=?, project_id=? WHERE id=?;';
        const params = [profile.name, profile.project_id, profileID];
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
 * Insert a new profile into the database.
 * @param profile the profile that has to be added into the database.
 * @returns the new id of the profile.
 */
function addProfile(profile) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO profile (name, project_id) VALUES (?,?);';
        const params = [profile.name, profile.project_id];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                try {
                    const newID = yield getProfileID(profile);
                    resolve(newID);
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Delete a profile from the database.
 * @param profileID the id of the profile to be deleted
 */
function deleteProfile(profileID) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM profile WHERE id=?;";
        const params = [profileID];
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
 * Get ID of a profile.
 * @param profile the id of this profile will be searched for
 * @returns the id of the profile
 */
function getProfileID(profile) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM profile WHERE name=? AND project_id=?;';
        const params = [profile.name, profile.project_id];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log("Could not find ID of profile.");
                reject('404');
            }
            else {
                const newID = rows[0].id;
                resolve(newID);
            }
        });
    });
}
module.exports = {
    getProjectProfiles,
    updateProfile,
    addProfile,
    deleteProfile
};
//# sourceMappingURL=profiles_methods.js.map