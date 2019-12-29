const db_conn = require('../../databaseconnection');
import Profile from '../../types/profile';
import Questionnaire from '../../types/questionnaire';
import { QuestionnaireController } from '../questionnaires/questionnaires_methods';
const $projects_methods = require('../projects/project_methods');

let questionnairecontroller: QuestionnaireController = new QuestionnaireController();

/**
 * Get all profiles of a project (without the skills)
 * Only data from profile table will be fetched.
 * @param projectID search for all profiles of the project with projectID as ID 
 */
function getProjectProfiles(projectID: number): Promise<Profile[]> {
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT * FROM profile WHERE project_id=?;';
            const params: any[] = [projectID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject("500");
                } else {
                    let profiles: Profile[] = [];
                    for (let i=0; i < rows.length; i++){
                        // TODO: get skills
                        let profile_questions = JSON.parse(rows[i].questions);
                        let profile: Profile = {
                            id: rows[i].id,
                            name: rows[i].name,
                            project_id: projectID,
                            skills: [],
                            questions: profile_questions
                        }
                        profiles.push(profile);
                    }
                    resolve(profiles);
                }
            });
        }
    );
}


/**
 * Update existing profile in the database.
 * The skills won't be updated.
 * @param profileID the id of the profile to be updated
 * @param profile new data of the profile
 */
function updateProfile(profileID: number, profile: Profile): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            // Make a string of the questions
            let questions = "";
            for (let i = 0; i < profile.questions.length; i++){
                questions += `\"${profile.questions[i]}\"`;
                if (i < profile.questions.length - 1){
                    questions += ",";
                }
            }
            questions = "[" + questions + "]";
            const query: string = 'UPDATE profile SET name=?, project_id=?, questions=? WHERE id=?;';
            const params: any[] = [profile.name, profile.project_id, questions, profileID];
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
 * Insert a new profile into the database.
 * The skills of the profile won't be inserted into the database in this method.
 * This method makes new Questionnaire entries in the database with the questions of this profile
 * @param profile the profile that has to be added into the database.
 * @returns the new id of the profile.
 */
function addProfile(profile: Profile, creator_id: number, project_name: string): Promise<number> {
    return new Promise(
        (resolve: any, reject: any) => {
            console.log("Profile: ");
            console.log(profile);
            // Make a string of the questions
            let questions = "";
            for (let i = 0; i < profile.questions.length; i++){
                questions += `\"${profile.questions[i]}\"`;
                if (i < profile.questions.length - 1){
                    questions += ",";
                }
            }
            questions = "[" + questions + "]";
            // Insert the profile
            const query: string = 'INSERT INTO profile (name, project_id, questions) VALUES (?,?,?);';
            const params: any[] = [profile.name, profile.project_id, questions];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        let newQuestionnaire: Questionnaire = {
                            id: null,
                            creator_id: creator_id,
                            name: project_name + ": " + profile.name,
                            questions: profile.questions
                        }
                        console.log(newQuestionnaire);
                        const newQuestionnaireID: number = await questionnairecontroller.addQuestionnaire(newQuestionnaire)
                        const newID: number = await getProfileID(profile);
                        console.log("Sucessfully inserted profile");
                        resolve(newID);
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }
    );
}


/**
 * Delete a profile from the database.
 * All skills will automatically be deleted too (because of the foreign key constraints in the database).
 * @param profileID the id of the profile to be deleted
 */
function deleteProfile(profileID: number): Promise<void>{
    return new Promise(
        (resolve:any, reject:any) => {
            const query: string = "DELETE FROM profile WHERE id=?;";
            const params: any[] = [profileID];
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
 * Get ID of a profile.
 * @param profile the id of this profile will be searched for
 * @returns the id of the profile
 */
function getProfileID(profile: Profile): Promise<number> {
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT id FROM profile WHERE name=? AND project_id=?;';
            const params: any[] = [profile.name, profile.project_id];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else if (rows.length < 1) {
                    console.log("Could not find ID of profile.");
                    reject('404');
                } else {
                    const newID: number = rows[0].id;
                    resolve(newID);
                }
            });
        }
    );
}


module.exports = {
    getProjectProfiles,
    updateProfile,
    addProfile,
    deleteProfile
}