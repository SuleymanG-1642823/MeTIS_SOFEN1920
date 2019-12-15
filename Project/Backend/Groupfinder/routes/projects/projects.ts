import express from 'express';
const router = express.Router();
import Project from '../../types/project';
import Profile from '../../types/profile';
import Skill from '../../types/skill';
const $project_methods = require('./project_methods');
const $profile_methods = require('../profiles/profiles_methods');
const $profile_skill_methods = require('../profiles_skills/profiles_skills_methods');

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
 * Get project with specific ID from the database.
 */
router.get('/:project_id', async (req: any, res: any) => {
    const project_id: number = parseInt(req.params.project_id);
    try{
        const project: Project = await $project_methods.getProject(project_id);
        let profiles: Profile[] = await $profile_methods.getProjectProfiles(project_id);
        for (let i = 0; i < profiles.length; i++) {
            let skills: Skill[] = await $profile_skill_methods.getSkillsOfProfile(profiles[i].id);
            profiles[i].skills = skills;
        }
        project.profiles = profiles;
        res.status(200).json({project});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching project from the database.");
    }    
});


/**
 * Get all projects sorted from newest to oldest from the database.
 */
router.get('/', async (req: any, res: any) => {
    try {
        const projects: Project[] = await $project_methods.getAllProjects();
        for (let i = 0; i < projects.length; i++) {
            let project: Project = projects[i];
            let profiles: Profile[] = await $profile_methods.getProjectProfiles(project.id);
            for (let j = 0; j < profiles.length; j++) {
                let skills: Skill[] = await $profile_skill_methods.getSkillsOfProfile(profiles[j].id);
                profiles[j].skills = skills;
            }
            project.profiles = profiles;
        }
        res.status(200).json(projects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all projects from the database.");
    }
});

/**
 * Get matching projects for the user from the database.
 */
router.get('/matchFor/:userID', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.userID);
    try { // Array<Object>
        const matchingProjects: any = await $project_methods.getMatchingProjects(userID);
        res.status(200).json(matchingProjects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching matching projects from the database.");
    }
});

/**
 * Update existing project in the database.
 * @pre body of http request contains the project (type: Project) in JSON format
 */
router.put('/:project_id', async (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    const project: Project = req.body.project;
    try{
        await $project_methods.updateProject(projectID, project);
        for (let i = 0; i < project.profiles.length; i++) {
            await $profile_methods.updateProfile(project.profiles[i].id, project.profiles[i]);
            for (let j = 0; j < project.profiles[i].skills.length; j++){
                await $profile_skill_methods.updateSkillOfProfile(project.profiles[i].id, project.profiles[i].skills[j].name, project.profiles[i].skills[j]);
            }
        }
        res.status(200).send('Successfully updated project in the database.');
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating project in the database.");
    }
});


/**
 * Insert new project into the database. All profiles of the project will be added too.
 * @pre body of http request contains new project (type: Project) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const project: Project = req.body;
    console.log(project)
    try{
        const newProjectID: number = await $project_methods.addProject(project);
        const profiles: Profile[] = project.profiles;
        for (let i = 0; i < profiles.length; i++){
            profiles[i].project_id = newProjectID;
            let profileID = await $profile_methods.addProfile(profiles[i], project.creator_id);
            for (let j = 0; j < profiles[i].skills.length; j++){
                await $profile_skill_methods.addSkillToProfile(profileID, profiles[i].skills[j]);
            }
        }
        res.status(200).json({id: newProjectID});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new project into the database.");
    }
});


/**
 * Delete project from the database. All profiles of the project (and their skills) will be deleted too.
 */
router.delete('/:project_id', async (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    try{
        await $project_methods.deleteProject(projectID);
        res.status(200).send("Successfully deleted project from the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting project from the database.");
    }
});

module.exports = router;