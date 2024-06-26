const express = require('express');
const config = require('config');
const ejs = require('ejs');
const app = express();
app.use(express.json());
app.use('/', require('./router/main'));
app.set('view engine', 'ejs');

app.listen(config.get('server.port'), config.get('server.hostname'), () => {
    console.log(`listening on ${config.get('server.hostname')}:${config.get('server.port')}`);
});