const Words = require('../models/Words')

// function getNextWord(   assessmentLevel,
//                         previousWords,
//                         getWordBack){

function getNextWord(nextWord, getWordBack){

// console.log('getNextWord called with ' +JSON.stringify(nextWord))

Words.find({"assesment": nextWord.assessmentLevel}, function(err, availableWords){
    if(err){console.log(err)}
    
//Make an array of just the words
    var availableWordsText = availableWords.map(function(x){
        return x["word"];
    })

    // console.log('availiable words = '+ availableWordsText)
    // console.log('previous words = '+previousWords)

//Use this ES2016 function to find the difference between the arrays
    let difference = availableWordsText.filter(x => nextWord.previousWords.indexOf(x) == -1);
    // console.log('new word list ='+difference)

    nextWord.remaining = difference.length
    //has the test finished?
    if(nextWord.remaining === 0)
    {
        nextWord.status = 'end of test'
        
        // console.log('Reached the end of the test ' + nextWord)
        getWordBack(nextWord)
    }
    else
    {//Get a random number from the difference array
    // const wordNumber = Math.floor((Math.random() * c) + 1);
    const wordNumber = Math.floor((Math.random() * nextWord.remaining));
    nextWord.word = difference[wordNumber];

    // console.log('new word = ' + difference[wordNumber])
    // console.log('getNextWord is passing back ' + JSON.stringify(nextWord))

//To DO: returning word as an object - should just be a string
    // getWordBack({word : difference[wordNumber]})
    getWordBack(nextWord)
    }

})



}

module.exports = getNextWord
