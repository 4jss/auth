const express = require('express');
const config = require('config');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', require('./router/main'));
app.all('/', async(req, res) => {
    try {
        const client = new MongoClient(config.get('env.uri'));
        const b = req.cookies.token;
        const decodedb = await jwt.verify(b, config.get('env.secret'));
        const e = decodedb.username
        const c = client.db(config.get('env.db')).collection(config.get('env.users_collection')).findOne({ e });
            
        if (c !== null) {
            return res.redirect(`${config.get('server.hostname')}/user/dashboard`);
        }; 
    } catch (error) {
        return (
            console.error(error),
            res.status(500).json({ status: 500, message: 'internal server error' })
        )
    }
});

app.listen(config.get('server.port'), config.get('server.hostname'), () => {
    console.log(`listening on ${config.get('server.hostname')}:${config.get('server.port')}`);
});