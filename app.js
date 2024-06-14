const express = require('express');
const config = require('config');
const app = express();

app.use('/api', require('./api/main'))

app.listen(config.get('server.port'), config.get('server.hostname'), () => {
    console.log(`listening on ${config.get('server.hostname')}:${config.get('server.port')}`);
});