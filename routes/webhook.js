const express   = require('express');
const router    = express.Router();

const validation = (req, res, next) => {
    let { auth } = req.body;
    console.log('Auth', auth);

    next();
};

router.get('/status', (req, res) => {
    res.json({ statusCode: 200, statusMsg: "To Online" }).status(200);
});

router.post('/on', validation, (req, res) => {
    console.log(req.body);
    res.send('OK').status(200);
});

module.exports = router;