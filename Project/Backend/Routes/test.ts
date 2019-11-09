const express = require('express')
const router = express.Router()
import User from '../types/user';

router.get('/', (req: any, res: any) => {
    const user: User = {
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