var express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');
var newAssessment = require('../routes/newAssessment');
var answerRoute = require('../routes/answerRoute');
var newWord = require('../routes/newWord');
var app = express()

//CORS ** Don't forget to replace the URL of the app

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.use('/api/newAssessment', newAssessment);
app.use('/api/answer', answerRoute)
app.use('/api/newWord', newWord)

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

module.exports = {app}
