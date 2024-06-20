const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(config.get('env.uri'));
    
    try {
        // empty checks
        if (!username || !password ) {
            return res.status(200).json({ message: 'fill in all the fields' });
        }

        await client.connect();
        const a = await client.db(config.get('env.db')).collection(config.get('env.users_collection')).findOne({ username });

        if (a !== null) {
            return res.status(200).json({ message: 'username already taken' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        // user
        const user = {
            username: username,
            password: hashedPassword
        };

        await client.db(config.get('env.db')).collection(config.get('env.users_collection')).insertOne(user);

        const token = jwt.sign(user, config.get('env.secret'));
        
        return res.status(201).cookie('token', token).json({ message: 'user created' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal server error' });
    } finally {
        client.close();
    }
});

module.exports = router;