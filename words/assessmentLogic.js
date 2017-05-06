//THIS FUNCTION EXPECTS
//   var nextWord = {assessmentId:'',
//                   userId:'',
//                   assessmentLevel:''};


function assessmentLogic(nextWord, callback){
    nextWord.word = 'bibble'
    callback(nextWord)
}

module.exports = assessmentLogic