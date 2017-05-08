//answer route
const express = require('express');
var Assessments = require('../models/Assessments');
var assessmentLogic = require('../words/assessmentLogic')

const router = new express.Router();

router.route('/')
.post(function(req, res){
    // console.log('ANSWER ROUTE got ' + JSON.stringify(req.body))

//Wated hours trying to update subdocument

const answerTimeStamp = Date.now()

Assessments.findOneAndUpdate({  '_id' : req.body.assessmentId, 
                                'question.questionId' : req.body.questionId }, 
                                { 'question.$.answer' : req.body.answer,
                                  'question.$.answer_time': answerTimeStamp},
                                function(err, data){
                                    if(err){
                                        console.log('error finding question')
                                        res.send(err)
                                    }
                                // console.log('MONGOOSE returned: ' +data)

var nextWord = {    assessmentId: data._id,
                    userId: data.userId,
                    assessmentLevel:data.assessmentLevel,
                    previousWords: [],
                    status: 'in progress',
                    answer: req.body.answer,
                    answerTimeStamp : answerTimeStamp
                };
// console.log('Answer Route is About to Send = ' + JSON.stringify(nextWord))
nextWord = assessmentLogic(nextWord, (nextWord)=>{
// console.log('callback to answer route ' + JSON.stringify(nextWord))
                    res.json(nextWord)
                })

                                });
}) 

module.exports = router