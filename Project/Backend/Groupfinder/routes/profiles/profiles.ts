import express from 'express';
const router = express.Router();
const $profiles_methods = require('./profiles_methods');
const $projects_methods = require('../projects/project_methods');
const $profiles_skills_methods = require('../profiles_skills/profiles_skills_methods');
import Profile from '../../types/profile';
import Project from '../../types/project';


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
 * Get all profiles of a project.
 */
router.get('/:project_id', async (req: any, res: any) => {
    const project_id: number = parseInt(req.params.project_id);
    try {
        const profiles: Profile[] = await $profiles_methods.getProjectProfiles(project_id);
        for (let i=0; i < profiles.length; i++) {
            profiles[i].skills = await $profiles_skills_methods.getSkillsOfProfile(profiles[i].id);
        }
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
        for (let i=0; i < profile.skills.length; i++) {
            await $profiles_skills_methods.updateSkillOfProfile(profileID, profile.skills[i].name, profile.skills[i]);
        }
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
        // We need the creator_id for the addProfile, we can look it up using the project_id
        const project: Project = await $projects_methods.getProject(profile.project_id);
        const creator_id: number = project.creator_id;

        const newProfileID: number = await $profiles_methods.addProfile(profile, creator_id);
        for (let i=0; i < profile.skills.length; i++) {
            await $profiles_skills_methods.addSkillToProfile(newProfileID, profile.skills[i]);
        }
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