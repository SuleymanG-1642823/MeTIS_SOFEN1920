import express from 'express';
const router = express.Router();
import User from '../../types/user';

/**
 * Middleware that is specific to this router
 */
router.use(function usersMiddleware (req: any, res: any, next: Function) {
    console.log(`Users middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// define routes
/////////////////////////////////////////////////////////////////////////////////////

router.get('/:user_id', (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    console.log(req.params.user_id)
    // Normally, user data would be fetched from the database here.
    const user: User = {
        id: user_id,
        first_name: 'Liese',
        last_name: 'Bekkers',
        email: 'liese.bekkers@student.uhasselt.be'
    }
    res.status(200).json(user);
});

router.post('/', (req: any, res: any) => {
    // Normally, data from the payload would be handled here.
    res.status(200).send('POST request received.')
})

module.exports = router;