const express = require('express');
const config = require('config');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', require('./router/main'));
app.all('/*', async(req, res) => {
    try {
        return res.status(404).render('404');
    } catch (error) {
        return (
            console.error(error),
            res.status(500).json({ status: 500, message: 'internal server error' })
        );
    }
});

app.listen(config.get('server.port'), config.get('server.hostname'), () => {
    console.log(`listening on ${config.get('server.hostname')}:${config.get('server.port')}`);
});