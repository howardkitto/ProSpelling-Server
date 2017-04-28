const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// define the User model schema
const  Challenges = new mongoose.Schema({
  user: {type: String, index: { unique: true }},
  question:{
    questionId: {type: String, index: { unique: true }},
    started_time: {type: Date},
    word :{type: String}
  }
}, {timestamps:{}} );

module.exports = mongoose.model('Challenges', Challenges);
