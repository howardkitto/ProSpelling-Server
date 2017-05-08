// var challengeDetails = {};
//   var assessmentLevel = req.body.assessmentLevel;

//WASTED HOURS learning async
  async.series([
    function(callback){
        console.log('FIRST ASYNC: assessment level = ' + assessmentLevel)
        // const assessment = { user: uuid(),
        //                     assessmentLevel: assessmentLevel
        //                   }

        const newassessment = new Assessment(assessment)
              newassessment.save(
                function(err, users){
                  if (err) 
                  {console.log(err)
                    return callback(err);}
                  challengeDetails = newassessment
                  // console.log('challengeDetails ' + JSON.stringify(challengeDetails))
                  callback();
                });
          },
    function(callback){
    
    console.log('SECOND ASYNC: assessment level = ' + challengeDetails.assessmentLevel)
      var previousWords = []
      
      //WASTED many hours on how to get this call back to work!!
      function getWordBack(word){
        challengeDetails.word = word.word;
        callback();

      }
      console.log()
  //I've hardcoded the assessment number here    
      var nextWord = getNextWord(challengeDetails.assessmentLevel, previousWords, (word) => getWordBack(word))

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
                  assessmentLevel: challengeDetails.assessmentLevel})  
          callback();
    }
        ]);
  }

   // const newassessment = new Assessments(assessment)

    // newassessment.save(function(err, data){
        // if (err) 
        // {console.log(err)
        //   return callback(err);}

        // nextWord.assessmentId = newassessment._id;
        // nextWord.userId = newassessment.userId;
        // nextWord.assessmentLevel = newassessment.assessmentLevel;

        // console.log('nextWord ' + JSON.stringify(nextWord))

  //call assessment logic

        // nextWord = assessmentLogic(nextWord, (nextWordUpdated)=>{
        //             // console.log('callback ' + JSON.stringify(nextWordUpdated))
        //             res.json(nextWordUpdated)
        //         })   

//         function assessmentLogicCallback(updatedNextWord){
//           console.log('assessmentLogicCallback = ' +JSON.stringify(updatedNextWord))

//         }

//         nextWord = assessmentLogic(nextWord, (updatedNextWord)=>assessmentLogicCallback(updatedNextWord))     
//         });
// });



// router.route('/nextWord')
// .post(function(req, res){

// var newQuestion = {};


// async.series([
//  function(callback){
//    console.log('step 1: level = ' + req.body.challengeId)
   
//     Challenges.findById(req.body.challengeId, function(err, challenge){
          
//           newQuestion.challengeId = challenge._id,
//           newQuestion.assessmentLevel = challenge.assessmentLevel
          
//            callback(null, challenge.assessmentLevel);
      
//      })
//   },
//     function(callback){ 

//     //WASTED HOURS ON THIS! Needed to use lean()

//     var query = Challenges.findOne({"_id":newQuestion.challengeId}).select('question.word').lean()
    
//     query.exec(function (err, questions){

//     var questionsNoDate = questions.question

//    newQuestion.previousWords = questionsNoDate.map(function(x){
//   return x["word"];
// });

// // var result = Array.prototype.slice.call(questionsNoDate, 1)
// console.log(newQuestion.previousWords);

//       callback(null, 'two')

//     })    

//   },
//   function(callback){
//     //spent many hours on how to get this call back to work!!
//       function getWordBack(word){
//         newQuestion.word = word.word;
//         callback(null, word.word);

//       }

//       var nextWord = getNextWord( newQuestion.assessmentLevel,
//                                   newQuestion.previousWords,
//                                   (word) => getWordBack(word))

//   },
//   function(callback){

//     if(!newQuestion.word){console.log('game over')
//     //this is where we send back the score, probably break this into a new async function
//     res.json({'status':'end of test'}
//     )}
//     else{
//       // insert row
//       console.log('step 3: - insert question ' + newQuestion.challengeId)
//       Challenges.findOneAndUpdate({'_id' : newQuestion.challengeId},
//         {$push: {'question':{ 'questionId': uuid(),
//                               'word':newQuestion.word,
//                               'started_time': Date.now()
//                     }}},
//         function(err,data){
//           if(err){res.send(err)}

//           // console.log('insert question '+data)
//         callback(null, newQuestion.id );}
//         );}
//     },

//   function(callback){
//     console.log('Step 5: send back the answer')
//     // res.json({challengeId: newQuestion.challengeId,
    
//     res.json(newQuestion)

//     callback(null, 'three');
//   }]
//   );

//  });

// router.route('/attempt')
// .post(function(req, res){

//         console.log('make an attempt ' + JSON.stringify(req.body))

//         const attempt = { 'questionId':req.body.questionId,
//                           'answer':req.body.answer}

//         const newAttempt = new Attempts(attempt)
//         newAttempt.save(function(err,data){
//           if(err){res.send(err)}
//           res.json(data)})
        
//  });

// //route for setting up new words
//  router.route('/newWord')
// .post(function(req, res){

//         console.log('make a word ' + JSON.stringify(req.body))

//         const word = {    'word':req.body.word,
//                           'level':req.body.level,
//                           'assesment':req.body.assesment,
//                           'characteristics': req.body.characteristics
//                           }

//         const newWord = new Words(word)
//         newWord.save(function(err,data){
//           if(err){res.send(err)}
//           res.json(data)})
        
//  });
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