const db_conn = require('../../databaseconnection');
import Questionnaire from '../../types/questionnaire';

/**
 * Manage all interactions with questionnaires in the database
 */
export class QuestionnaireController {
    /**
     * Get all the questionnaires of a user
     * @param creator_id the id of the user
     * @returns a list with Questionnaire objects ordered from new to old
     */
    public getQuestionnaires(creator_id: number): Promise<Questionnaire[]> {
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
                            let questionnaire_questions = JSON.parse(rows[i].questions);
                            let questionnaire: Questionnaire = {
                                id: rows[i].id,
                                name: rows[i].name,
                                creator_id: rows[i].creator_id,
                                questions: questionnaire_questions
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
    public getQuestionnaire(id: number): Promise<Questionnaire> {
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
    public addQuestionnaire(questionnaire: Questionnaire): Promise<number> {
        return new Promise(
            (resolve: any, reject: any) => {
                let questions = "";
                for (let i = 0; i < questionnaire.questions.length; i++){
                    questions += `\"${questionnaire.questions[i]}\"`;
                    if (i < questionnaire.questions.length - 1){
                        questions += ",";
                    }
                }
                questions = "[" + questions + "]";
                const query: string = 'INSERT INTO questionnaire (name, creator_id, questions) VALUES (?,?,?);';
                const params: any[] = [questionnaire.name, questionnaire.creator_id, questions];
                db_conn.query(query, params, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        try{
                            const newID: number = await this.getQuestionnaireID(questionnaire, questions);
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
    public getQuestionnaireID(questionnaire: Questionnaire, questionsAsString: string): Promise<number> {
        return new Promise(
            (resolve, reject) => {
                const query: string = "SELECT last_insert_id() AS id;";
                db_conn.query(query, async (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else if (rows.length <= 0 || rows[0].id == 0) {
                        console.log("Could not find id of inserted questionnaire.");
                        reject('404');
                    } else {
                        resolve(rows[0].id);
                    }
                });
            }
        )
    }
}
