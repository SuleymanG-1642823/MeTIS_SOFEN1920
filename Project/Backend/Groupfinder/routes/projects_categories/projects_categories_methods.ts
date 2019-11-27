const db_conn = require('../../databaseconnection');
import Category from '../../types/category';
import Project from '../../types/project';
const $categories_methods = require('../categories/categories_methods');
const $projects_methods = require("../projects/project_methods");


/**
 * Get all categories to which a certain project belongs.
 * @param projectID the id of the project for which all categories will be searched.
 * @return a promise of a list of all categories (type: Category[])
 */
function getAllCategoriesOfProject(projectID: number): Promise<Category[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT category_id FROM project_category WHERE project_id=?;';
            const params: any[] = [projectID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        let categories: Category[] = [];
                        for (let i=0; i < rows.length; i++) {
                            let categoryID: number = rows[i].category_id;
                            let category: Category = await $categories_methods.getCategory(categoryID);
                            categories.push(category);
                        }
                        resolve(categories);
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }
    );
}


/**
 * Get all projects that belong to a certain category.
 * @param categoryID the id of the category for which all of its projects will be searched
 * @return a promise of a list of all projects (type: Promise<Project[]>)
 */
function getAllProjectsOfCategory(categoryID: number): Promise<Project[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = "SELECT project_id FROM project_category WHERE category_id=?;";
            const params: any[] = [categoryID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        let projects: Project[] = [];
                        for (let i=0; i < rows.length; i++){
                            let projectID: number = rows[i].project_id;
                            let project: Project = await $projects_methods.getProject(projectID);
                            projects.push(project);
                        }
                        resolve(projects);
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        }
    );
}


/**
 * Assign project to a category.
 * @param projectID the id of the project that will be assigned to a category
 * @param categoryID the id of the category to which a project will be assigned
 */
function addProjectToCategory(projectID: number, categoryID: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'INSERT INTO project_category VALUES (?,?);';
            const params: any[] = [projectID, categoryID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        }
    );
}


/**
 * Remove project from category.
 * The project keeps existing but does not belong to the category anymore.
 * @param projectID the id of the project that will be removed from a category
 * @param categoryID the id of the category from which a project will be removed
 */
function removeProjectFromCategory(projectID: number, categoryID: number): Promise<void> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'DELETE FROM project_category WHERE project_id=? AND category_id=?;';
            const params: any[] = [projectID, categoryID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        }
    );
}


module.exports = {
    getAllCategoriesOfProject,
    getAllProjectsOfCategory,
    addProjectToCategory,
    removeProjectFromCategory
}