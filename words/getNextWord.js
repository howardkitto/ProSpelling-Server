const Words = require('../models/Words')

function getNextWord(   assessmentLevel,
                        previousWords,
                        getWordBack){

console.log('getNextWord ')
console.log('assessmentLevel ' + assessmentLevel)
var previousWordCount = previousWords.length
console.log('previousWordCount = ' + previousWordCount)


Words.find({"assesment": assessmentLevel}, function(err, availiableWords){
    if(err){console.log(err)}
    var availiableWordCount = availiableWords.length
    var wordsInTest = availiableWordCount - previousWordCount
    
    const wordNumber = Math.floor((Math.random() * wordsInTest) + 1);
    getWordBack(availiableWords[wordNumber])



})



}

module.exports = getNextWord
