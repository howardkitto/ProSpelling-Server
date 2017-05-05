const mongoose = require('mongoose')

const Words = new mongoose.Schema({
    word: {type: String},
    level:  {type: String},
    assesment: {type : String},
    characteristics:{type: String}
}, {timestamps:{}})


module.exports = mongoose.model('Words', Words);