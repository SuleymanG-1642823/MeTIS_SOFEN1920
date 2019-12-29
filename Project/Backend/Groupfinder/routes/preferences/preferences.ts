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
        const type: boolean = ('true' == req.params.type);
        const categories: Category[] = await controller.getPreferences(userID, type);
        res.status(200).json(categories);
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while fetching preferred categories from the database.")
    }
})

/**
 * Update an existing preference in the database.
 */
router.put('/:user_id/:category_id/:type', async (req: any, res: any) => {
    try{
        const userID: number = parseInt(req.params.user_id);
        const categoryID: number = parseInt(req.params.category_id);
        const type: boolean = ('true' == req.params.type);
        await controller.updatePreference(userID, categoryID, type);
        res.status(200).send('Successfully changed prefered category in the database.');
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while updating preferred category in the database.");
    }
})

/**
 * Insert category (non-)preferred by a user into the database.
 * url param type must be a boolean (true for preferred categories, false for non-preferred)
 */
router.post('/:user_id/:category_id/:type', async (req: any, res: any) => {
    try{
        const userID: number = parseInt(req.params.user_id);
        const categoryID: number = parseInt(req.params.category_id);
        const type: boolean = ('true' == req.params.type);
        await controller.addPreference(userID, categoryID, type);
        res.status(200).send('Successfully added preferred category into the database.')
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while inserting preferred category into the database.")
    }
})

/**
 * Delete preferred category from the database.
 */
router.delete('/:user_id/:category_id', async (req: any, res: any) => {
    try{
        const userID: number = parseInt(req.params.user_id);
        const categoryID: number = parseInt(req.params.category_id);
        await controller.deletePreference(userID, categoryID);
        res.status(200).send('Successfully deleted preferred category from the database.');
    } catch (err) {
        const code: number = parseInt(err);
        res.status(code).send("Error while deleting preferred category from the database.");
    }
})

module.exports = router;
