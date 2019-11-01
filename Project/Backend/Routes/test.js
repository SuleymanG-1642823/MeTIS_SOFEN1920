const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('This is a test route.')
});

router.post('/', (req, res) => {
    // Normally, data from the payload would be handled here.
    res.status(200).send('POST request received.')
})

module.exports = router;