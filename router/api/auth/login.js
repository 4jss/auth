const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    try {
        const client = new MongoClient(config.get('env.uri'));
        const b = req.cookies.token;
        const decodedb = await jwt.verify(b, config.get('env.secret'));
        const e = decodedb.username
        const c = client.db(config.get('env.db')).collection(config.get('env.users_collection')).findOne({ e });
        
        if (c !== null) {
            return res.redirect(`${config.get('server.hostname')}/`);
        };

        if (!username || !password ) {
            return res.status(200).json({ message: 'fill in all the fields' });
        };

        await client.connect();

        const a = client.db(config.get('env.db')).collection(config.get('env.users_collection')).findOne({ username });

        if (a == null) {
            return res.status(200).json({ message: 'username not found' });
        };
        
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    } finally {
        client.close();
    }
});

module.exports = router;