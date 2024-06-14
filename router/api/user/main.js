const express = require('express');
const router = express.Router();

router.use('/changepassword', require('./changepassword'));
router.use('/changeusername', require('./changeusername'));

module.exports = router;