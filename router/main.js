const express = require('express');
const router = express.Router();

router.use('/api', require('./api/main'));
router.use('/user', require('./user/main'));

module.exports = router;