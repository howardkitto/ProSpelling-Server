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

//WASTED HOURS learning async
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
          
      //WASTED many hours on how to get this call back to work!!
      function getWordBack(word){
        challengeDetails.word = word.word;
        callback();

      }
      console.log()
  //I've hardcoded the assessment number here    
      var nextWord = getNextWord(challengeDetails.startingLevel, 1, (word) => getWordBack(word))

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
  //  console.log('step 1: level = ' + req.body.challengeId)
   
    Challenges.findById(req.body.challengeId, function(err, challenge){
          
          newQuestion.challengeId = challenge._id,
          newQuestion.level = challenge.startingLevel
          
           callback(null, challenge.startingLevel);
      
     })
  },
    function(callback){

    //WASTED HOURS ON THIS! Needed to use lean()

    var query = Challenges.findOne({"_id":newQuestion.challengeId}).select('question.word').lean()
    
    query.exec(function (err, questions){

    var questionsNoDate = questions.question

   newQuestion.previousWords = questionsNoDate.map(function(x){
  return x["word"];
});

// var result = Array.prototype.slice.call(questionsNoDate, 1)
console.log(newQuestion.previousWords);

      callback(null, 'two')

    })    

  },
  function(callback){
    //spent many hours on how to get this call back to work!!
      function getWordBack(word){
        newQuestion.word = word.word;
        callback(null, word.word);

      }

      var nextWord = getNextWord( newQuestion.level,
                                  newQuestion.previousWords,
                                   1, (word) => getWordBack(word))

  },
  function(callback){
      // insert row
      console.log('step 3: - insert question ' + newQuestion.challengeId)
      Challenges.findOneAndUpdate({'_id' : newQuestion.challengeId},
        {$push: {'question':{ 'questionId': uuid(),
                              'word':newQuestion.word,
                              'started_time': Date.now()
                    }}},
        function(err,data){
          if(err){res.send(err)}

          // console.log('insert question '+data)
        callback(null, newQuestion.id );}
        );
    },

  function(callback){
    console.log('Step 5: send back the answer')
    // res.json({challengeId: newQuestion.challengeId,
    
    res.json(newQuestion)

    callback(null, 'three');
  }]
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
 router.route('/newWord')
.post(function(req, res){

        console.log('make a word ' + JSON.stringify(req.body))

        const word = {    'word':req.body.word,
                          'level':req.body.level,
                          'assesment':req.body.assesment,
                          'characteristics': req.body.characteristics
                          }

        const newWord = new Words(word)
        newWord.save(function(err,data){
          if(err){res.send(err)}
          res.json(data)})
        
 });


module.exports = router;
