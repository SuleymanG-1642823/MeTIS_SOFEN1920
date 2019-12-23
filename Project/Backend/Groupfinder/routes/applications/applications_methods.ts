const db_conn = require('../../databaseconnection');
import Application from '../../types/application';
import Answer from '../../types/answer';

/**
 * Inserts an application for a profile into the database
 * @param application the application object containing all the information about the application
 * @returns the new id of the application
 */
function applyForProject(application: Application): Promise<number> {
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

            const query: string = 'INSERT INTO application (user_id, project_id, profile_id, answers, status, created_at, edited_at) VALUES (?,?,?,?,?,?,?)';
            const params: any[] = [application.user_id, application.profile_id, application.profile_id, answers, application.status, application.created_at, application.edited_at];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    const newID = await getApplicationID();
                    resolve(newID);
                }
            });
        }
    );
}

/**
 * Get ID of the last inserted application
 * @returns the id of the application
 */
function getApplicationID(): Promise<number> {
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

module.exports = {
    applyForProject,
    getApplicationID
}