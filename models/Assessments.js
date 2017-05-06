const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  word :{type: String},
  answer:{type: String}
}, {timestamps:{}});

const  Assessments = new mongoose.Schema({
  userId: {type: String},
  assessmentLevel: {type: String},
  question: Question
}, {timestamps:{}} ); 

module.exports = mongoose.model('Assessments', Assessments);
