const express = require('express');
var Challenges = require('../models/Challenges');
var Attempts = require('../models/Attempts');
var uuid = require('uuid')

const router = new express.Router();

router.route('/')

.post(function(req, res){

  const challenge = { user: uuid()}
    const newChallenge = new Challenges(challenge)
    newChallenge.save();
  res.json({'challengeId':newChallenge._id, 'userId' : newChallenge.user})
});


router.route('/question')
.post(function(req, res){

        console.log('get a new word for ' + JSON.stringify(req.body))
        
        Challenges.findOneAndUpdate({'_id' : req.body.id},
        {$push: {'question':{ 'questionId': uuid(),
                          'word':req.body.word, //this is where the alogorithm goes
                          'started_time': Date.now()
                    }}},
        function(err,data){
          if(err){res.send(err)}

          res.json({data})
        });
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


module.exports = router;
