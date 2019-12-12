const db_conn = require('../../databaseconnection');
import Questionnaire from '../../types/questionnaire';


/**
 * Get all the questionnaires of a user
 * @param creator_id the id of the user
 * @returns a list with Questionnaire objects ordered from new to old
 */
function getQuestionnaires(creator_id: number): Promise<Questionnaire[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT * FROM questionnaire WHERE creator_id=? ORDER BY id DESC;';
            const params: any[] = [creator_id];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let questionnaires : Questionnaire[] = [];
                    for (let i=0; i < rows.length; i++){
                        let questionnaire: Questionnaire = {
                            id: rows[i].id,
                            name: rows[i].name,
                            creator_id: rows[i].creator_id,
                            questions: rows[i].questions
                        }
                        questionnaires.push(questionnaire);
                    }
                    resolve(questionnaires);
                }
            });
        }
    );
}


/**
 * Get a single questionnaire by its id
 * @param id the id of the questionnaire
 * @returns the questionnaire
 */
function getQuestionnaire(id: number): Promise<Questionnaire> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT * FROM questionnaire WHERE id=?;';
            const params: any[] = [id];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let questionnaire : Questionnaire = {
                        id: rows[0].id,
                        name: rows[0].name,
                        creator_id: rows[0].creator_id,
                        questions: rows[0].questions
                    }
                    resolve(questionnaire);
                }
            });
        }
    );
}


/**
 * Inserts a new questionnaire into the database
 * Questions get stored as JSON
 * @param questionnaire the questionnaire that has to be added to the database
 * @returns the new id of the questionnaire
 */
function addQuestionnaire(questionnaire: Questionnaire): Promise<number> {
    return new Promise(
        (resolve: any, reject: any) => {
            const questionJSON: Object = {
                questions: questionnaire.questions
            }
            console.log(questionJSON);
            const query: string = "INSERT INTO questionnaire (name, creator_id, questions) VALUES ('testQuestion', 1, '{'questions': {['Question 1','Question 2']}});";
            const params: any[] = [questionnaire.name, questionnaire.creator_id, questionJSON.toString()];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        const newID: number = await getQuestionnaireID(questionnaire);
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
 * Get ID of a questionnaire
 * @param questionnaire the questionnaire that we are searching for
 * @returns the id of the questionnaire
 */
function getQuestionnaireID(questionnaire: Questionnaire): Promise<number> {
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT * FROM questionnaire WHERE name=? creator_id=? questions=? ORDER BY id DESC;';
            const params: any[] = [questionnaire.name, questionnaire.creator_id, questionnaire.questions.toString];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve(rows[0]);
                }
            });
        }
    )
}

module.exports = {
    getQuestionnaires,
    getQuestionnaireID,
    addQuestionnaire
}
