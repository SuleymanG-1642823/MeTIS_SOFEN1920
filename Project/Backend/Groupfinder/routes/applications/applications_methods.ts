const db_conn = require('../../databaseconnection');
import Application from '../../types/application';
import Answer from '../../types/answer';
import Project from '../../types/project';
import { ProjectController } from '../projects/project_methods';

let projectcontroller: ProjectController = new ProjectController();

/**
 * Manage all interactions with applications in the database
 */
export class ApplicationController {
    /**
     * Inserts an application for a profile into the database
     * @param application the application object containing all the information about the application
     * @returns the new id of the application
     */
    public applyForProject(application: Application): Promise<number> {
        return new Promise(
            (resolve: any, reject: any) => {
                // Convert the answers to a string
                let answers = "";
                for (let i = 0; i < application.answers.length; i++){
                    answers += '{ \"question\": ' + `\"${application.answers[i].question}\"` + ', \"answer\": ' + `\"${application.answers[i].answer}\"` + '}';
                    if (i < application.answers.length - 1){
                        answers += ",";
                    } 
                }
                answers = "[" + answers + "]";

                const query: string = 'INSERT INTO application (user_id, project_id, profile_id, answers, status, created_at, edited_at) VALUES (?,?,?,?,?,?,?);';
                const params: any[] = [application.user_id, application.profile_id, application.profile_id, answers, application.status, application.created_at, application.edited_at];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        const newID = await this.getApplicationID();
                        resolve(newID);
                    }
                });
            }
        );
    }


    /**
     * Returns an application object containing the requested application
     * @param applicationID the id of the application
     * @returns application object
     */
    public getApplication(applicationID: number): Promise<Application> {
        return new Promise(
            (resolve: any, reject: any) => {
                const query: string = "SELECT * FROM application WHERE id=?;";
                const params: any[] = [applicationID];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        let application: Application = {
                            id: rows[0].id,
                            user_id: rows[0].user_id,
                            profile_id: rows[0].profile_id,
                            project_id: rows[0].project_id,
                            answers: JSON.parse(rows[0].answers),
                            status: rows[0].status,
                            created_at: rows[0].created_at,
                            edited_at: rows[0].edited_at
                        };
                        resolve(application);
                    }
                });
            }
        );
    }


    /**
     * Get all the applications for a single profile
     * @param profile_id the id of the profile
     * @returns an array with application objects containing all the applications for the profile
     */
    public getProfileApplications(profile_id: number): Promise<Application[]> {
        return new Promise(
            (resolve: any, reject: any) => {
                console.log(profile_id);
                const query: string = 'SELECT * FROM application WHERE profile_id=?;';
                const params: any[] = [profile_id];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err) {
                        console.log('error');
                        console.log(err);
                        reject('500');
                    } else {
                        console.log(rows);
                        let applications: Application[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            let application: Application = {
                                id: rows[i].id,
                                user_id: rows[i].user_id,
                                profile_id: rows[i].profile_id,
                                project_id: rows[i].project_id,
                                answers: JSON.parse(rows[i].answers),
                                status: rows[i].status,
                                created_at: rows[i].created_at,
                                edited_at: rows[i].edited_at
                            }
                            applications.push(application);
                        }
                        resolve(applications);
                    }
                });
            }
        );
    }


    /**
     * Get all the projects a user has applied for
     * @param user_id the is of the user
     * @returns A list of Project objects containing all the projects the user has applied for
     */
    public getUserProjects(user_id: number): Promise<Project[]>{
        return new Promise(
            (resolve: any, reject: any) => {
                const query: string = 'SELECT * FROM application WHERE user_id=?;';
                const params: any[] = [user_id];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        let projects: Project[] = [];
                        for (let i = 0; i < rows.length; i++){
                            let project: Project = await projectcontroller.getProject(rows[i].project_id);
                            projects.push(project);
                        }
                        resolve(projects);
                    }
                })
            }
        )
    }


    /**
     * Changes the status of an application
     * @param newStatus an integer indicating the new status
     * @param applicationID the id of the application that will be updated
     */
    public changeStatus(newStatus: number, applicationID: number): Promise<void>{
        return new Promise(
            (resolve: any, reject: any) => {
                const query: string = 'UPDATE application SET status=? WHERE id=?;';
                const params: any[] = [newStatus, applicationID];
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


    /**
     * Removes an application from the database
     * @param applicationID the id of the application
     */
    public removeApplication(applicationID: number): Promise<void>{
        return new Promise(
            (resolve: any, reject: any) => {
                const query: string = "DELETE FROM application WHERE id=?;";
                const params: any[] = [applicationID];
                db_conn.query(query, params, async (err: any, rows: any) =>{
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        resolve();
                    }
                });
            }
        )
    }


    /**
     * Get ID of the last inserted application
     * @returns the id of the application
     */
    public getApplicationID(): Promise<number> {
        return new Promise(
            (resolve, reject) => {
                const query: string = "SELECT last_insert_id() AS id;";
                db_conn.query(query, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else if (rows.length <= 0 || rows[0].id == 0) {
                        console.log("Could not find id of inserted application.");
                        reject('404');
                    } else {
                        resolve(rows[0].id);
                    }
                });
            }
        )
    }
}
