const express = require('express');
const router = express.Router();

/////////////////////////////////////////////////////////////////////////////////////
// middleware that is specific to this router
/////////////////////////////////////////////////////////////////////////////////////
router.use(function testMiddleware (req, res, next) {
    console.log(`Test middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// define routes
/////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
    res.status(200).send('This is a test route.')
});

router.post('/', (req, res) => {
    // Normally, data from the payload would be handled here.
    res.status(200).send('POST request received.')
});

module.exports = router;
