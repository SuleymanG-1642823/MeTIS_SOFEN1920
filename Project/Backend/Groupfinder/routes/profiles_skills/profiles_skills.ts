import express from 'express';
const router = express.Router();
import { ProfileSkillController } from './profiles_skills_methods';
import Skill from '../../types/skill';

let profileskillcontroller: ProfileSkillController = new ProfileSkillController();

/**
 * Get all skills of a profile.
 */
router.get('/:profile_id', async (req: any, res: any) => {
    const profileID: number = parseInt(req.params.profile_id);
    try{
        const skills: Skill[] = await profileskillcontroller.getSkillsOfProfile(profileID);
        res.status(200).json(skills);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching skills of a profile from the database.");
    }
});

/**
 * Update a profile's skill in the database.
 * @pre the body of the request contains the new skill (body.skill)
 */
router.put('/:profile_id/:skill_name', async (req: any, res: any) => {
    const profileID: number = parseInt(req.params.profile_id);
    const skillName: string = req.params.skill_name;
    const skill: Skill = req.body.skill;
    try{
        await profileskillcontroller.updateSkillOfProfile(profileID, skillName, skill);
        res.status(200).send("Successfully updated a profile's skill in the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating the skills of a profile in the database.");
    }
});


/**
 * Link a new skill to an existing project.
 * This method will insert a new entry in the profile_skill table.
 * @pre the body of the request contains the profile (body.profile) and the new skill (body.skill)
 */
router.post('/', async (req: any, res: any) => {
    const profileID: number = req.body.profileID;
    const skill: Skill = req.body.skill;
    try{
        await profileskillcontroller.addSkillToProfile(profileID, skill);
        res.status(200).send('Successfully added skill to profile.')
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting into the profile_skill table.");
    }
});


/**
 * Remove a skill from a profile.
 * An entry in the profile_skill table will be deleted.
 * The profile won't be deleted from the database.
 */
router.delete('/:profile_id/:skill_name', async (req: any, res: any) => {
    const profileID: number = parseInt(req.params.profile_id);
    const skillName: string = req.params.skill_name;
    try{
        profileskillcontroller.removeSkillFromProfile(profileID, skillName);
        res.status(200).send("Successfully deleted a profile's skill from the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting a profile's skill from the database.");
    }
});

module.exports = router;