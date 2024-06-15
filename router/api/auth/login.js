const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { username, password } = req.body;
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
});

module.exports = router;