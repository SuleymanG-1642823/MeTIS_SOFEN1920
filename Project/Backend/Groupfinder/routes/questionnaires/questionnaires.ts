import express from 'express';
const router = express.Router();
const $questionnaire_methods = require('./questionnaires_methods');
import Questionnaire from '../../types/questionnaire';


/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get all questionnaires of a user
 */
router.get('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try {
        const questionnaires: Questionnaire[] = await $questionnaire_methods.getQuestionnaires(user_id);
        res.status(200).json(questionnaires);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all questionnaires of a user.");
    }
});


/**
 * Insert a new questionnaire into the database.
 * @pre the body of the http request constains the new questionnaire (type: Questionnaire) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    try{
        const questionnaire: Questionnaire = req.body.questionnaire;
        console.log(questionnaire.creator_id);
        console.log(questionnaire.questions);
        const newQuestionnaireId: number = await $questionnaire_methods.addQuestionnaire(questionnaire);
        res.status(200).json({id: newQuestionnaireId});
    } catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new questionnaire into the database.");
    }
});

module.exports = router;