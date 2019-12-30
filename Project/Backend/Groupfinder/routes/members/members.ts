import express from 'express';
const router = express.Router();
import { MemberController } from './members_methods';
import User from '../../types/user';
import Project from '../../types/project';

let membercontroller: MemberController = new MemberController();

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
        await membercontroller.addMember(user_id, project_id, profile_id);
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
        const users: User[] = await membercontroller.getMembersProfile(profile_id);
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
        await membercontroller.deleteMember(user_id, project_id, profile_id);
        res.status(200).send("Successfully removed member from profile");
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while removing member from this profile");
    }
});


/**
 * Gets all the projects that the user with :user_id is a member of
 */
router.get('/user/:user_id', async (req: any, res: any) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const projects: Project[] = await membercontroller.getProjectsUser(user_id);
        res.status(200).json(projects);
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching the projects of this user");
    }
});

module.exports = router;