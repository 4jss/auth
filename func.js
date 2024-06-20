const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('config');

function genToken(data, time) {
    return jwt.sign(data, config.get('env.secret'), { expiresIn: time });
}

function decodeToken(data) {
    return jwt.verify(data, config.get('env.secret'));
}

async function insert(data, collection, database) {
    const client = new MongoClient(config.get('env.uri'), { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        return await client.db(database).collection(collection).insertOne(data);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
};

(async() => {
    try {
        const idk = await insert({ message: 'hi :333' }, 'idk', 'db');
        console.log(idk)
    } catch (e) {
        console.error(e);
    }
});