const mongoose = require('mongoose')

const Attempts = new mongoose.Schema({
    questionId: {type: String},
    answer: {type: String}  
}, {timestamps:{}})


module.exports = mongoose.model('Attempts', Attempts);