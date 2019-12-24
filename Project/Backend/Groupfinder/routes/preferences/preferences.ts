import express from 'express';
const router = express.Router();
import Category from '../../types/category';
import { Preferences } from './preferences_methods';

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

module.exports = router;