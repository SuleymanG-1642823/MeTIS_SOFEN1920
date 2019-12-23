import express from 'express';
const router = express.Router();
const $applications_methods = require('./applications_methods');
import Application from '../../types/application';

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
 * Insert a new application into the database
 * @pre the body of the http request constains the application (type: Application) in JSON format
 */
router.post('/', async (req:any, res:any) => {
    const application: Application = req.body.application;
    try {
        const applicationID: number = await $applications_methods.applyForProject(application);
        res.status(200).json({id: applicationID});
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new application into the database.");
    }
});


module.exports = router;