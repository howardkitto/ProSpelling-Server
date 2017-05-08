const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  questionId : {type: String},
  word :{type: String},
  answer:{type: String},
  answer_time:{type:Date}
}, {timestamps:{}});

const  Assessments = new mongoose.Schema({
  userId: {type: String},
  assessmentLevel: {type: String},
  question: Question
}, {timestamps:{}} ); 

module.exports = mongoose.model('Assessments', Assessments);
