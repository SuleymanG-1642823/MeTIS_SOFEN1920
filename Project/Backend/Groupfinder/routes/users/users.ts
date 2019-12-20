import express from 'express';
const router = express.Router();
import User from '../../types/user';
const $users_methods = require('./users_methods');

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Users middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get user with specific id from database
 */
router.get('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        const user: User = await $users_methods.getUser(user_id);
        res.status(200).json({user});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching user from the database.");
    }
});

/**
 * Get users that match with at least one of the profiles of the given project
 */
router.get('/matchFor/:project_id', async (req: any, res: any) => {
    const project_id: number = parseInt(req.params.project_id);
    try{
        let result = await $users_methods.getMatchingUsers(project_id);
        res.status(200).json(result);
    }catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching user matches.");
    }
});

/**
 * Change data of existing user in the database.
 * @pre body of http request contains existing user (type: User) in JSON format
 */
router.put('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    const user: User = req.body.user;
    try{
        await $users_methods.updateUser(user_id, user);
        res.status(200).send("Successfully updated user in the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating user in the database.");
    }
});


/**
 * Insert new user into database
 * @pre body of http request contains new user (type: User) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const user: User = req.body.user;
    try{
        const newUserID: number = await $users_methods.addUser(user);
        res.status(200).json({id: newUserID})
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new user into the database.");
    }
});


/**
 * Delete user from the database.
 */
router.delete('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        await $users_methods.deleteUser(user_id);
        res.status(200).send("Successfully deleted user.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting user from the database.");
    }
});

module.exports = router;