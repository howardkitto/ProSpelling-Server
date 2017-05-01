const express = require('express');
var Challenges = require('../models/Challenges');
var Attempts = require('../models/Attempts');
var Words = require('../models/Words');
var uuid = require('uuid')
var getNextWord = require('../words/getNextWord')

const router = new express.Router();


function createNewChallenge(startingLevel){

  const userUuid = uuid();

  const challenge = { user: uuid(),
                      startingLevel: startingLevel
                    }

  const newChallenge = new Challenges(challenge)
        newChallenge.save();

  return ( {'challengeId':newChallenge._id, 
            'userUuid' : newChallenge.user, 
            'startingLevel':newChallenge.startingLevel})
  }



router.route('/challenge')

.post(function(req, res){
  console.log('Create new challenge ' + JSON.stringify(req.body.startingLevel))

    
    const newChallenge = createNewChallenge(JSON.stringify(req.body.startingLevel))

    console.log('newChallenge Function returned ' + newChallenge)

    res.json(newChallenge)
});


// router.route('/question')
// .post(function(req, res){

//         const nextWord = getNextWord(req.body.level);

//         // console.log('get a new word for ' + JSON.stringify(req.body))
//         console.log('the next word is level' + req.body.level);
        
//         Challenges.findOneAndUpdate({'_id' : req.body.id},
//         {$push: {'question':{ 'questionId': uuid(),
//                           'word':'monkey', //this is where the alogorithm goes
//                           'started_time': Date.now()
//                     }}},
//         function(err,data){
//           if(err){res.send(err)}

//           res.json({data})
//         });
//  });

// router.route('/getNextWord').post(function(req, res){
//   console.log(' challengeId ' + req.body.challengeId +
//                 ' startingLevel ' + req.body.startingLevel)

//   res.json({word:'eagle'})
// })

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
