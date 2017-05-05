const Words = require('../models/Words')

function getNextWord(   level,
                        previousWords,
                        assesment, getWordBack){


// console.log('getNextWord ' )




Words.find({"assesment": assesment}, function(err, availiableWords){

    var wordsDone = previousWords.length
    var wordsReady = availiableWords.length
    var wordsLeft =  wordsReady - wordsDone                   

    // console.log('words left ' + wordsDone + ' ' + wordsReady) 
    console.log('words left ' + wordsLeft)

    // if(availiableWords.length === previousWords.length){return false}

    
    const c = availiableWords.length
    const wordNumber = Math.floor((Math.random() * c) + 1);
         getWordBack(availiableWords[wordNumber])
})


}

module.exports = getNextWord
