import express from 'express';
const router = express.Router();
const $reviews_methods = require('./reviews_methods');
import Review from '../../types/review';

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
 * Get all reviews of a user (where user is the receiver, not the writer).
 */
router.get('/receiver/:user_id', async (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    try{
        const reviews: Review[] = await $reviews_methods.getReviewsForReceiver(userID);
        res.status(200).json(reviews);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching reviews for a user.");
    }
});

module.exports = router;