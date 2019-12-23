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


/**
 * Get all the applications for the profile with ID :profile_id
 */
router.get('/profile/:profile_id', async (req: any, res: any) => {
    console.log(req.params);
    try{
        const profile_id: number = parseInt(req.params.profile_id);
        const applications: Application[] = await $applications_methods.getProfileApplications(profile_id);
        res.status(200).json(applications);
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(500).send("Error while fetching all applications from the database where profileID is the id of the profile of the applications.");
    }
});


module.exports = router;