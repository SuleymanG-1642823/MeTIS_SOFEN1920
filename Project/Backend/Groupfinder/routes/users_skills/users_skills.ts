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

module.exports = router;