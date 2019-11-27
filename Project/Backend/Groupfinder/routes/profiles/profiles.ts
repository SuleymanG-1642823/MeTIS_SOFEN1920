import express from 'express';
const router = express.Router();
const $profiles_methods = require('./profiles_methods');
import Profile from '../../types/profile';


/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Profiles middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get all profiles of a project.
 */
router.get('/:project_id', async (req: any, res: any) => {
    const project_id: number = parseInt(req.params.project_id);
    try {
        const profiles: Profile[] = await $profiles_methods.getProjectProfiles(project_id);
        res.status(200).json(profiles);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all profiles of a project.");
    }
});


/**
 * Update existing profile in the database.
 * @pre the body of the http request contains the updated profile (type: Profile) in JSON format
 */
router.put('/:profile_id', async (req: any, res: any) => {
    const profileID: number = parseInt(req.params.profile_id);
    const profile: Profile = req.body.profile;
    try{
        await $profiles_methods.updateProfile(profileID, profile);
        res.status(200).send("Successfully updated profile in the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating profile in the database.");
    }
});


/**
 * Insert a new profile into the database.
 * @pre the body of the http request contains the new profile (type: Profile) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const profile: Profile = req.body.profile;
    try{
        const newProfileID: number = await $profiles_methods.addProfile(profile);
        res.status(200).json({id: newProfileID});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new profile into the database.");
    }
});


/**
 * Delete a profile from the database.
 */
router.delete('/:profile_id', async (req: any, res: any) => {
    const profileID: number = parseInt(req.params.profile_id);
    try{
        await $profiles_methods.deleteProfile(profileID);
        res.status(200).send("Successfully deleted profile from the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting profile from the database.");
    }
});


module.exports = router;