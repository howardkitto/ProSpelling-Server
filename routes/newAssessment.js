const express = require('express');
const async = require('async')
var Assessments = require('../models/Assessments');
var Words = require('../models/Words');
var uuid = require('uuid')
var getNextWord = require('../words/getNextWord')
var assessmentLogic = require('../words/assessmentLogic')

const router = new express.Router();


router.route('/')
.post(function(req, res){

// console.log('ROUTE got ' + JSON.stringify(req.body))
  var nextWord = {assessmentId:'',
                  userId:'',
                  assessmentLevel:'',
                  previousWords: [],
                  word: '',
                  status: 'in progress'};

  async.series([
    function(callback){
      const assessment = { userId: uuid(),
                       assessmentLevel: req.body.assessmentLevel
                     }

      const newassessment = new Assessments(assessment)
      newassessment.save(function(err, data){

        if (err) 
        {console.log(err)
          return callback(err);}

        nextWord.assessmentId = newassessment._id;
        nextWord.userId = newassessment.userId;
        nextWord.assessmentLevel = newassessment.assessmentLevel;
        nextWord.status = 'in progress';

        // console.log('nextWord ' + JSON.stringify(nextWord))

        callback()
      })
    },
    function(callback){

      function assessmentLogicCallback(updatedNextWord){
          // console.log('assessmentLogic Callback 1 = ' +JSON.stringify(updatedNextWord))
          nextWord= updatedNextWord
          callback()
        }

        nextWord = assessmentLogic(nextWord, (updatedNextWord)=>assessmentLogicCallback(updatedNextWord))     
         
    },
    function(callback){
      // console.log('assessmentLogicCallback 2 = ' +JSON.stringify(nextWord))
      res.json(nextWord)
      callback()
    }
  ])
})  


module.exports = router;
