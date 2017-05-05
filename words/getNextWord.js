const Words = require('../models/Words')

function getNextWord(   assessmentLevel,
                        previousWords,
                        getWordBack){

console.log('getNextWord ')


Words.find({"assesment": assessmentLevel}, function(err, availableWords){
    if(err){console.log(err)}
    
//Make an array of just the words
    var availableWordsText = availableWords.map(function(x){
        return x["word"];
    })

    // console.log('availiable words = '+ availableWordsText)
    // console.log('previous words = '+previousWords)

//Use this ES2016 function to find the difference between the arrays
    let difference = availableWordsText.filter(x => previousWords.indexOf(x) == -1);
    console.log('new word list ='+difference)

    let c = difference.length
    //has the test finished?
    if(c === 0)
    {
        console.log('Reached the end of the test')
        getWordBack(false)
    }
    else
    {//Get a random number from the difference array
    // const wordNumber = Math.floor((Math.random() * c) + 1);
    const wordNumber = Math.floor((Math.random() * c));
    console.log('new word = ' + difference[wordNumber])

//To DO: returning word as an object - should just be a string
    getWordBack({word : difference[wordNumber]})
    }

})



}

module.exports = getNextWord
