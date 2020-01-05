import express from 'express';
const router = express.Router();
import Project from '../../types/project';
import Profile from '../../types/profile';
import Skill from '../../types/skill';
import Category from '../../types/category';
import { ProjectController } from './project_methods';
import { ProfileController } from '../profiles/profiles_methods';
import { ProfileSkillController } from '../profiles_skills/profiles_skills_methods';
import { CategoryController } from '../categories/categories_methods';

let categorycontroller: CategoryController = new CategoryController();
let profilecontroller: ProfileController = new ProfileController();
let projectcontroller: ProjectController = new ProjectController();
let profileskillcontroller: ProfileSkillController = new ProfileSkillController();

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
        const project: Project = await projectcontroller.getProject(project_id);
        console.log('#Project fetched')
        let profiles: Profile[] = await profilecontroller.getProjectProfiles(project_id);
        console.log('#Profiles fetched')
        for (let i = 0; i < profiles.length; i++) {
            console.log("Profile: " + profiles[i].name);
            let skills: Skill[] = await profileskillcontroller.getSkillsOfProfile(profiles[i].id);
            console.log("Skills: " + skills.toString());
            profiles[i].skills = skills;
        }
        console.log('#Skills fetched')
        project.profiles = profiles;
        let categories: string = await categorycontroller.getProjectCategories(project_id)
        console.log('#Categories fetched: ' + categories)
        
        // Categories are allowed to be NULL, check for that to prevent errors
        if (categories !== null){
            let categories_array_string: string[] = categories.substring(1, categories.length-1).split(", ");
            let categories_array: number[] = [];
            for (let i = 0; i < categories_array_string.length; i++) {
                categories_array.push(parseInt(categories_array_string[i]));
            }
            for (let i = 0; i < categories_array.length; i++){
                let new_category = await categorycontroller.getCategory(categories_array[i])
                project.categories.push(new_category)
            }
        }
        
        console.log('#Categories processed')
        res.status(200).json({project});
    } catch (err) {
        console.log('#in route catch, err: ' + err)
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching project from the database.");
    }    
});


/**
 * Get all projects sorted from newest to oldest from the database.
 */
router.get('/', async (req: any, res: any) => {
    try {
        const projects: Project[] = await projectcontroller.getAllProjects();
        for (let i = 0; i < projects.length; i++) {
            let project: Project = projects[i];
            let profiles: Profile[] = await profilecontroller.getProjectProfiles(project.id);
            for (let j = 0; j < profiles.length; j++) {
                let skills: Skill[] = await profileskillcontroller.getSkillsOfProfile(profiles[j].id);
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
 * Get all projects from the database where userID is the id of the owner of the projects.
 * The project won't contain any profile
 */
router.get('/owner/:user_id', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    try{
        const projects: Project[] = await projectcontroller.getAllProjectsOfOwner(userID);
        res.status(200).json(projects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all projects from the database where userID is the id of the owner of the projects.");
    }
});

/**
 * Get all projects from the database where user with userID is a member (not the owner) of the project.
 */
router.get('/teammember/:user_id', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    try{
        const projects: Project[] = await projectcontroller.getAllProjectsWithMember(userID);
        res.status(200).json(projects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all projects from the database where user with userID is a member (not the owner) of the project.");
    }
})

/**
 * Get matching projects for the user from the database.
 */
router.get('/matchFor/:userID', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.userID);
    try {
        const matchingProjects: any = await projectcontroller.getMatchingProjects(userID);
        res.status(200).json(matchingProjects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching matching projects from the database.");
    }
});

/**
 * Get projects that contain given string in their names.
 */
router.get('/search/:str', async (req: any, res: any) => {
    const str: string = req.params.str;
    try {
        const results: any = await projectcontroller.getProjectsContainingStr(str);
        res.status(200).json(results);
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
    console.log(project);
    try{
        await projectcontroller.updateProject(projectID, project);
        for (let i = 0; i < project.profiles.length; i++) {
            await profilecontroller.updateProfile(project.profiles[i].id, project.profiles[i]);
            for (let j = 0; j < project.profiles[i].skills.length; j++){
                await profileskillcontroller.updateSkillOfProfile(project.profiles[i].id, project.profiles[i].skills[j].name, project.profiles[i].skills[j]);
            }
        }
        await categorycontroller.addCategoriesToProject(project.categories, projectID)
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
    try{
        const project: Project = req.body;
        const newProjectID: number = await projectcontroller.addProject(project);
        const profiles: Profile[] = project.profiles;
        for (let i = 0; i < profiles.length; i++){
            profiles[i].project_id = newProjectID;
            let profileID = await profilecontroller.addProfile(profiles[i], project.creator_id, project.name);
            for (let j = 0; j < profiles[i].skills.length; j++){
                await profileskillcontroller.addSkillToProfile(profileID, profiles[i].skills[j]);
            }
        }
        await categorycontroller.addCategoriesToProject(project.categories, newProjectID)
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
        await projectcontroller.deleteProject(projectID);
        res.status(200).send("Successfully deleted project from the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting project from the database.");
    }
});


/**
 * Get all the projects of one user
 */
router.get('/user/:userID', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.userID);
    try { // Array<Object>
        const projects: Project[] = await projectcontroller.getProjectsUser(userID);
        res.status(200).json(projects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching the user's projects");
    }
});

module.exports = router;
