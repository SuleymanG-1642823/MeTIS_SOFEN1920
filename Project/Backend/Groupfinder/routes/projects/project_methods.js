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
const moment = require('moment');
const $profiles_methods = require('../profiles/profiles_methods');
/**
 * Get project with specific ID from the database.
 * @param projectID the id of the project that will be searched for
 */
function getProject(projectID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT project.id AS projectID, name, status, pitch, created_at, edited_at, user.id AS userID, user.first_name, user.last_name  FROM project JOIN user ON user.id=project.creator_id WHERE project.id=?;';
        const params = [projectID];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(`Error while fetching project from database: ${err}`);
                reject("500");
            }
            else if (rows.length < 1) {
                console.log(`Error finding project with id ${projectID}.`);
                reject("404");
            }
            else {
                try {
                    const profiles_result = yield $profiles_methods.getProjectProfiles(rows[0].projectID);
                    const project = {
                        id: rows[0].projectID,
                        name: rows[0].name,
                        status: rows[0].status,
                        pitch: rows[0].pitch,
                        created_at: moment(rows[0].created_at).format('YYYY-MM-DD hh:mm:ss'),
                        edited_at: moment(rows[0].edited_at).format('YYYY-MM-DD hh:mm:ss'),
                        creator_id: rows[0].userID,
                        creator_first_name: rows[0].first_name,
                        creator_last_name: rows[0].last_name,
                        profiles: profiles_result
                    };
                    resolve(project);
                }
                catch (err) {
                    console.log("Error while fetching profiles of a project from the database.");
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Get all projects sorted from newest to oldest from the database.
 */
function getAllProjects() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT project.id AS projectID, name, status, pitch, created_at, edited_at, user.id AS userID, user.first_name, user.last_name  FROM project JOIN user ON user.id=project.creator_id ORDER BY created_at DESC;';
        db_conn.query(query, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(`Error while fetching all projects from the database.\n${err}`);
                reject("500");
            }
            else {
                let allProjects = [];
                for (let i = 0; i < rows.length; i++) {
                    const profiles_result = yield $profiles_methods.getProjectProfiles(rows[i].projectID);
                    let project = {
                        id: rows[i].projectID,
                        name: rows[i].name,
                        status: rows[i].status,
                        pitch: rows[i].pitch,
                        created_at: moment(rows[i].created_at).format('YYYY-MM-DD hh:mm:ss'),
                        edited_at: moment(rows[i].edited_at).format('YYYY-MM-DD hh:mm:ss'),
                        creator_id: rows[i].userID,
                        creator_first_name: rows[i].first_name,
                        creator_last_name: rows[i].last_name,
                        profiles: profiles_result
                    };
                    allProjects.push(project);
                }
                resolve(allProjects);
            }
        }));
    });
}
/**
 * Update existing project in the database.
 * @param projectID the id of the project that has to be updated
 * @param project the updated project
 */
function updateProject(projectID, project) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE project SET creator_id=?, name=?, status=?, pitch=?, created_at=?, edited_at=? WHERE id=?;';
        const params = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at, projectID];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject("500");
            }
            else {
                try {
                    for (let i = 0; i < project.profiles.length; i++) {
                        let profile = project.profiles[i];
                        yield $profiles_methods.updateProfile(profile.id, profile);
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Insert new project into the database. All profiles of the project will be added too.
 * @param project the new project
 * @returns the new id of the project that was inserted into the database.
 */
function addProject(project) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO project (creator_id, name, status, pitch, created_at, edited_at) VALUES (?,?,?,?,?,?);";
        const params = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject("500");
            }
            else {
                try {
                    const newProjectID = yield getProjectID(project);
                    for (let i = 0; i < project.profiles.length; i++) { // insert profiles into profile table
                        let newProfile = project.profiles[i];
                        newProfile.project_id = newProjectID;
                        yield $profiles_methods.addProfile(newProfile);
                    }
                    resolve(newProjectID);
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Delete project from the database.
 * @param projectID the id of the project that has to be deleted
 */
function deleteProject(projectID) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM project WHERE id=?;';
        const params = [projectID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject("500");
            }
            else {
                resolve();
            }
        });
    });
}
/**
 * Get id of project from the database.
 * @param project the project of which the id will be searched for (type: Project)
 * @returns promise of the project's id (type: Promise<number>)
 */
function getProjectID(project) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM project WHERE creator_id=? AND name=? AND created_at=?;';
        const params = [project.creator_id, project.name, project.created_at];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject("500");
            }
            else if (rows.length < 1) {
                console.log("Could not find the id of the project.");
                reject("404");
            }
            else {
                const id = rows[0].id;
                resolve(id);
            }
        });
    });
}
module.exports = {
    getProject,
    getAllProjects,
    updateProject,
    addProject,
    deleteProject
};
//# sourceMappingURL=project_methods.js.map