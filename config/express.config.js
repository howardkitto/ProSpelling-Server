var express = require('express')
var bodyParser = require('body-parser');
var api = require('../routes/api.routes');
var app = express()

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

module.exports = {app}
