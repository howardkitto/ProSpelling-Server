// //route for setting up new words
const express = require('express');
const Words = require('../models/Words')

const router = new express.Router();

 router.route('/')
.post(function(req, res){

        console.log('make a word ' + JSON.stringify(req.body))

        const word = {    'word':req.body.word,
                          'level':req.body.level,
                          'assesment':req.body.assesment,
                          'characteristics': req.body.characteristics
                          }

        const newWord = new Words(word)
        newWord.save(function(err,data){
          if(err){
              
              console.log('newWord barfed', err)
              res.send(err)}
          res.json(data)})
        
 });

 module.exports = router