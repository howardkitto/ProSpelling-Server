var express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');
var api = require('../routes/api.routes');
var app = express()

//CORS ** Don't forget to replace the URL of the app

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  // res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/api', api);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

module.exports = {app}
