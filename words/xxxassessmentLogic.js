const async = require('async')
var uuid = require('uuid')
var Assessments = require('../models/Assessments');
var getNextWord = require('./getNextWord')

function assessmentLogic(req, res)
{
var newQuestion = {};

async.series([
 function(callback){
  //  console.log('step 1: level = ' + req.body.challengeId)
   
    Assessments.findById(req.body.challengeId, function(err, challenge){
          
          newQuestion.challengeId = challenge._id,
          newQuestion.assessmentLevel = challenge.assessmentLevel
          
           callback(null, challenge.assessmentLevel);
      
     })
  },
    function(callback){

    //WASTED HOURS ON THIS! Needed to use lean()

    var query = Assessments.findOne({"_id":newQuestion.challengeId}).select('question.word').lean()
    
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
        newQuestion.remaining = word.remaining;
        callback(null, word.word);

      }

      var nextWord = getNextWord( newQuestion.assessmentLevel,
                                  newQuestion.previousWords,
                                  (word) => getWordBack(word))

  },
  function(callback){

    if(!newQuestion.word){console.log('game over')
    //this is where we send back the score, probably break this into a new async function
    res.json({'status':'end of test'}
    )}
    else{
      // insert row

      newQuestion.questionId = uuid()

      console.log('step 3: - insert question ' + newQuestion.challengeId)
      Challenges.findOneAndUpdate({'_id' : newQuestion.challengeId},
        {$push: {'question':{ 'questionId': newQuestion.questionId,
                              'word':newQuestion.word,
                              'started_time': Date.now()
                    }}},
        function(err,data){
          if(err){res.send(err)}

          // console.log('insert question '+data)
        callback();}
        );}
    },

  function(callback){
    console.log('Step 5: send back the new question ' +newQuestion)
    
    res.json(newQuestion)

    callback(null, 'three');
  }]
  );
}
  module.exports = assessmentLogic;