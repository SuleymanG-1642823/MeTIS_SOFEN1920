import express from 'express';
const router = express.Router();
import Category from '../../types/category';
import { PreferenceController } from './preferences_methods';

let controller: PreferenceController;

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    controller = new PreferenceController();
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get all categories preferred by a user from the database.
 * url param type must be a boolean (true for preferred categories, false for non-preferred)
 */
router.get('/:user_id/:type', async (req: any, res: any) => {
    try {
        const userID: number = parseInt(req.params.user_id);
        const type: boolean = req.params.type;
        const categories: Category[] = await controller.getPreferences(userID, type);
        res.status(200).json(categories);
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while fetching preferred categories from the database.")
    }
})

/**
 * Insert categories (non-)preferred by a user into the database.
 * url param type must be a boolean (true for preferred categories, false for non-preferred)
 */
router.post('/:user_id/:type', async (req: any, res: any) => {
    try{
        const userID: number = parseInt(req.params.user_id);
        const type: boolean = req.params.type;
        const categories: Category[] = req.body.categories;
        await controller.addPreferences(userID, categories, type);
        res.status(200).send('Successfully added preferred categories into the database.')
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while inserting preferred categories into the database.")
    }
})

/**
 * Delete preferred categories from the database.
 */
router.delete('/:user_id', async (req: any, res: any) => {
    try{
        const userID: number = parseInt(req.params.user_id);
        const categories: Category[] = req.body.categories;
        await controller.deletePreferences(userID, categories);
        res.status(200).send('Successfully deleted preferred categories from the database.');
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while deleting preferred categories from the database.");
    }
})

module.exports = router;
