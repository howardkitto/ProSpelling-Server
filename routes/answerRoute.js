//answer route
const express = require('express');
var Challenges = require('../models/Assessments');

const router = new express.Router();

router.route('/')
.post(function(req, res){
    console.log('ANSWER ROUTE got ' + JSON.stringify(req.body))
    Challenges.findOneAndUpdate(
        {'question.questionId': req.body.questionId},
        {$set: {'question': {   'answer': req.body.answer,
                                'answer_time' : Date.now()}}},
    function(err, data){
        if(err){
            console.log('error finding question')
            res.send(err)
        }
        console.log('MONGOOSE returned: ' +data)
        res.json({questionId : data.question})
    })
    
})

module.exports = router