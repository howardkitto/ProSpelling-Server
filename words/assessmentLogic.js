const async = require('async')
var uuid = require('uuid')
var Assessments = require('../models/Assessments');
var getNextWord = require('./getNextWord')

//THIS FUNCTION EXPECTS
//   var nextWord = {assessmentId:'',
//                   userId:'',
//                   assessmentLevel:''};


function assessmentLogic(nextWord, mainCallback){

// console.log('assessmentLogic about to start with '+ JSON.stringify(nextWord))

async.series([
    function(callback){
    //This function gets previous words from this assessment

    //WASTED HOURS ON THIS! Needed to use lean()
    // console.log('ASSESSEMENT LOGIC got assessmentId ' +nextWord.assessmentId)

    var query = Assessments.findOne({"_id":nextWord.assessmentId}).select('question.word').lean()
    
    query.exec(function (err, questions){

    if(questions.question){
        var questionsNoDate = questions.question
        nextWord.previousWords = questionsNoDate.map(function(x){
        return x["word"];
        });
    }

// console.log('Previous questions got '+ JSON.stringify(nextWord))

      callback()

    })    

    },

    function(callback){
        // nextWord.word = 'oh please'
        // console.log('Passing this to getNextWord module ' +JSON.stringify(nextWord))
        //this is where we call the next word algo

         //spent many hours on how to get this call back to work!!
      function getWordBack(nextWordUpdated){
        nextWord = nextWordUpdated;
        
        callback();}

        nextWord = getNextWord(nextWord, (nextWordUpdated) => getWordBack(nextWordUpdated))
    
    },

    function(callback){
    //have to generate an ID as mongo won't return subdoc id
    
    nextWord.questionId = uuid();
    // console.log('going to create a new database entry now with ' + JSON.stringify(nextWord))

    if(!nextWord.word){
    
    console.log('game over sending back  ' + nextWord)
    //this is where we send back the score, probably break this into a new async function
    
    mainCallback(nextWord)
    callback()
    }
    else{
      // insert row

    //   console.log('step 3: - insert question ' + nextWord.assessmentId)
      Assessments.findOneAndUpdate({'_id' : nextWord.assessmentId},
        {$push: {'question':{   'questionId': nextWord.questionId,
                                'word':nextWord.word,
                                'answer':'',
                                'answer_time':'',
                                'createdAt': Date.now()}}},
                                
        function(err,data){
          if(err){res.send(err)}

        //   console.log('insert question '+data)
        mainCallback(nextWord)
        callback();}
        );}
    }

    ])
    

}

module.exports = assessmentLogic