const express = require('express');
const async = require('async')
var Challenges = require('../models/Challenges');
var Attempts = require('../models/Attempts');
var Words = require('../models/Words');
var uuid = require('uuid')
var getNextWord = require('../words/getNextWord')

const router = new express.Router();


router.route('/challenge')
.post(function(req, res){
  
  var challengeDetails = {};
  var startingLevel = req.body.startingLevel;

  async.series([
    function(callback){
        // console.log('Init Challenge, first as sync ' + startingLevel)
        const challenge = { user: uuid(),
                            startingLevel: startingLevel
                          }

        const newChallenge = new Challenges(challenge)
              newChallenge.save(
                function(err, users){
                  if (err) return callback(err);
                  challengeDetails = newChallenge
                  // console.log('challengeDetails ' + JSON.stringify(challengeDetails))
                  callback();
                });
                
                // callback();
          },
    function(callback){
          // console.log('second async function')

    //go to the database and count all the words with the right level
        Words.count({'level':startingLevel},
            function (err,c){
            if(err){return err}
            console.log('Count is ' + c)

    // generate a random number to select a word        
            const wordNumber = Math.floor((Math.random() * c) + 1);
            console.log('word number ' + wordNumber)
            //find the word that corresponds to the random number
            Words.findOne().skip(wordNumber).exec(
        function (err, word) {
            // console.log('second async found ' + word.word)
            challengeDetails.word = word.word
            
            callback();
        })
        });
      },
    function(callback){
      // insert row
      // console.log('third async - insert question ' + challengeDetails.id)
      Challenges.findOneAndUpdate({'_id' : challengeDetails.id},
        {$push: {'question':{ 'questionId': uuid(),
                              'word':challengeDetails.word,
                              'started_time': Date.now()
                    }}},
        function(err,data){
          if(err){res.send(err)}

          // console.log('insert question '+data)
        callback();}
        );
    },
    function(callback){
      // console.log('fourth async function ' + typeof(challengeDetails) + ' ' + challengeDetails)
          res.json({challengeId: challengeDetails._id,
                   word: challengeDetails.word,
                  startingLevel: challengeDetails.startingLevel})  
          callback();
    }
        ]);
  }
);

router.route('/nextWord')
.post(function(req, res){

var newQuestion = {};

async.series([
 function(callback){
    Challenges.findById(req.body.challengeId, function(err, challenge){
          console.log('step 1: level = ' + challenge.startingLevel)
          newQuestion.level = challenge.startingLevel
          
           callback(null, challenge.startingLevel);
      
     })
  },
  function(callback){
    
      // getNextWord(newQuestion.level, ()=>callback())
      function getWordBack(word){
        console.log('callback function ' + word);
        newQuestion.word = word;
        callback(null, word.word);

      }

      var nextWord = getNextWord(newQuestion.level, (word) => getWordBack(word))

  },

  function(callback){
    console.log('Step 5: send back the answer')
    res.json({level: newQuestion.level,
              word: newQuestion.word.word})
    callback(null, 'three');
  }],
  function(err, results){
    console.log(results)
  }
  );

 });

router.route('/attempt')
.post(function(req, res){

        console.log('make an attempt ' + JSON.stringify(req.body))

        const attempt = { 'questionId':req.body.questionId,
                          'answer':req.body.answer}

        const newAttempt = new Attempts(attempt)
        newAttempt.save(function(err,data){
          if(err){res.send(err)}
          res.json(data)})
        
 });

//route for setting up new words
 router.route('/word')
.post(function(req, res){

        console.log('make a word ' + JSON.stringify(req.body))

        const word = { 'word':req.body.word,
                          'level':req.body.level,
                          'characteristics': req.body.characteristics
                          }

        const newWord = new Words(word)
        newWord.save(function(err,data){
          if(err){res.send(err)}
          res.json(data)})
        
 });


module.exports = router;
