import express from 'express';
import Category from '../../types/category';
const router = express.Router();
import { CategoryController } from './categories_methods';

let categorycontroller: CategoryController = new CategoryController();

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
 * Get category from the database.
 */
router.get('/:category_id', async (req: any, res: any) => {
    const categoryID: number = parseInt(req.params.category_id);
    try{
        const category: Category = await categorycontroller.getCategory(categoryID);
        res.status(200).json({category});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching category from the database.");
    }
});


/**
 * Get all categories from the database.
 */
router.get('/', async (req: any, res: any) => {
    try{
        const categories: Category[] = await categorycontroller.getAllCategories();
        console.log(categories)
        res.status(200).json(categories);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching all category from the database.");
    }
});


/**
 * Update an existing category in the database.
 * @pre the body of the request contains the updated category (type: Category) in JSON format
 */
router.put('/:category_id', async (req: any, res: any) => {
    const categoryID: number = parseInt(req.params.category_id);
    const category: Category = req.body.category;
    try{
        await categorycontroller.updateCategory(categoryID, category);
        res.status(200).send("Successfully updated category in the database.");
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating category in the database.");
    }
});


/**
 * Insert a new category into the database.
 * @pre the body of the request contains the new category (type: Category) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const category: Category = req.body.category;
    try{
        const newCategoryID: number = await categorycontroller.addCategory(category);
        res.status(200).json({id: newCategoryID});
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting category into the database.");
    }
});


/**
 * Delete a category from the database.
 */
router.delete('/:category_id',  async (req: any, res: any) => {
    const categoryID: number = parseInt(req.params.category_id);
    try{
        await categorycontroller.deleteCategory(categoryID);
        res.status(200).send('Successfully deleted category from the database.');
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while deleting category from the database.");
    }
});


module.exports = router;