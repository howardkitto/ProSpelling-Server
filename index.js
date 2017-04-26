
const express = require ('./config/express.config.js');
const config = require('./config');
require('./models').connect(config.dbUri);


express.app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080');
});