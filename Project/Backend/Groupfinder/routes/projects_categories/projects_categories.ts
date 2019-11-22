import express from 'express';
const router = express.Router();
import Project from '../../types/project';
import Category from '../../types/category';
const $projects_categories_methods = require("./projects_categories_methods");

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Projects-categories middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////


/**
 * Get all categories to which a certain project belongs.
 */
router.get('/project/:project_id', async (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    try{
        const categories: Category[] = await $projects_categories_methods.getAllCategoriesOfProject(projectID);
        res.status(200).json(categories);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching categories of a project.");
    }
});


/**
 * Get all projects that belong to a certain category.
 */
router.get('/category/:category_id', async (req: any, res: any) => {
    const categoryID: number = parseInt(req.params.category_id);
    try{
        const projects: Project[] = await $projects_categories_methods.getAllProjectsOfCategory(categoryID);
        res.status(200).json(projects);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching projects of a category.");
    }
});


/**
 * Assign project to a category.
 */
router.post('/:project_id/:category_id', async (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    const categoryID: number = parseInt(req.params.category_id);
    try{
        await $projects_categories_methods.addProjectToCategory(projectID, categoryID);
        res.status(200).send("Successfully assigned project to category.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while assigning project to a category.");
    }
});


/**
 * Remove project from category.
 * The project keeps existing but does not belong to the category anymore.
 */
router.delete('/:project_id/:category_id', async (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    const categoryID: number = parseInt(req.params.category_id);
    try{
        await $projects_categories_methods.removeProjectFromCategory(projectID, categoryID);
        res.status(200).send("Successfully removed project from category.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while removing project from category.");
    }
});


module.exports = router;