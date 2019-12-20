import express from 'express';
const router = express.Router();
const $users_skills_methods = require("./users_skills_methods");
import Skill from '../../types/skill';

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
 * Get all skills of a user
 */
router.get('/:user_id', async (req: any, res: any) => {
    const userID = parseInt(req.params.user_id);
    try{
        const skills: Skill[] = await $users_skills_methods.getSkillsOfUser(userID);
        res.status(200).json(skills);
    } catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching user's skills from the database.");
    }
});


/**
 * Update a skill of a user
 */
router.put('/:user_id/:skill_name', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    const skill_name: string = req.params.skill_name;
    const newSkill: Skill = req.body.skill;
    try{
        await $users_skills_methods.updateSkill(userID, skill_name, newSkill);
        res.status(200).send("Successfully updated user's skill.");
    } catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating user's skill.");
    }
});


/**
 * Delete a user's skill from the database.
 */
router.delete('/:user_id/:skill_name', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    const skill_name: string = req.params.skill_name;
    try{
        await $users_skills_methods.removeSkill(userID, skill_name);
        res.status(200).send("Successfully deleted user's skill.");
    } catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting user's skill.");
    }
});


/**
 * Add a new user's skill into the database.
 */
router.post('/:user_id', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    const skill: Skill = req.body.skill;
    try{
        await $users_skills_methods.addSkill(userID, skill);
        res.status(200).send("Successfully added user's skill into the database.");
    } catch (err){
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while adding user's skill.");
    }
});

module.exports = router;