const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    try {
        const { username, password } = req.body;
        // empty checks
        if (!username || !password ) {
            return res.status(200).json({ message: 'fill in all the fields' });
        }
        // user
        const user = {
            username: username,
            password: password
        };

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
});

module.exports = router;