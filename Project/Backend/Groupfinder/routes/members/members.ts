import express from 'express';
const router = express.Router();
const $members_methods = require('./members_methods');
import User from '../../types/user';

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
 * Insert a new member into the database
 */
router.post('/:user_id/:profile_id/:project_id', async (req: any, res: any) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const profile_id: number = parseInt(req.params.profile_id);
        const project_id: number = parseInt(req.params.project_id);
        await $members_methods.addMember(user_id, project_id, profile_id);
        res.status(200).send("Successfully added member");
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while adding member");
    }
});


/**
 * Get all the users of one profile with ID :profile_id
 * @returns a list of User objects containing all the users of the queried profile
 */
router.get('/profile/:profile_id', async (req: any , res: any) => {
    try {
        const profile_id = parseInt(req.params.profile_id);
        const users: User[] = await $members_methods.getMembersProfile(profile_id);
        res.status(200).json(users);
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching the members of this profile");
    }
});


/**
 * Removes a member from the database
 */
router.delete('/:user_id/:profile_id/:project_id', async (req: any, res: any) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const profile_id: number = parseInt(req.params.profile_id);
        const project_id: number = parseInt(req.params.project_id);
        await $members_methods.deleteMember(user_id, project_id, profile_id);
        res.status(200).send("Successfully removed member from profile");
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while removing member from this profile");
    }
})

module.exports = router;