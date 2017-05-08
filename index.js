
const express = require ('./config/express.config.js');
// const config = require('./config');

const uri = "mongodb://ProSpellingMongoCloud:ed3c1a55-95a0-4844-80ad-250da9746ad6@prospelling-shard-00-00-iqype.mongodb.net:27017,prospelling-shard-00-01-iqype.mongodb.net:27017,prospelling-shard-00-02-iqype.mongodb.net:27017/prospelling?ssl=true&replicaSet=ProSpelling-shard-0&authSource=admin"

require('./models').connect(uri);


express.app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080');
});