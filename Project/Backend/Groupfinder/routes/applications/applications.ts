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
        res.status(statusCode).send("Error while fetching all applications from the database where profileID is the id of the profile of the applications.");
    }
});


/**
 * Change the status of an application
 */
router.put('/status/:application_id/:status', async (req: any, res: any) => {
    try{
        const application_id: number = parseInt(req.params.application_id);
        const status: number = parseInt(req.params.status);
        await $applications_methods.changeStatus(status, application_id);
        res.status(200).send("Successfully updated application status");
    } catch(err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating application status");
    }
});


router.delete('/:application_id', async (req: any, res: any) => {
    try{
        const application_id: number = parseInt(req.params.application_id);
        await $applications_methods.removeApplication(application_id);
        res.status(200).send("Successfully deleted application");
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting application");
    }
});


module.exports = router;