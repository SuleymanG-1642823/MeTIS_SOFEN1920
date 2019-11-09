"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    const user = {
        first_name: 'Liese',
        last_name: 'Bekkers',
        email: 'liese.bekkers@student.uhasselt.be'
    };
    res.status(200).json(user);
});
router.post('/', (req, res) => {
    // Normally, data from the payload would be handled here.
    res.status(200).send('POST request received.');
});
module.exports = router;
//# sourceMappingURL=test.js.map