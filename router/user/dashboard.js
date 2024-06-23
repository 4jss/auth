const express = require('express');
const config = require('config');
const router = express.Router();

router.get('/', async(req, res) => {
    return res.render('dashboard', { appName: config.get('env.appName')});
});

module.exports = router;