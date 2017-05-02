const Words = require('../models/Words')

function getNextWord(level, getWordBack)
{
// console.log('getNextWordCalled ' + level)

//go to the database and count all the words with the right level
    Words.count({'level':level},
        function (err,c){
            if(err){return err}
            console.log('Step 2: Count = ' + c)

    // generate a random number to select a word        
            const wordNumber = Math.floor((Math.random() * c) + 1);
            console.log('Step 3: word number ' + wordNumber)

    //find the word that corresponds to the random number
             Words.findOne().skip(wordNumber).exec(
                function (err, word) {
                    console.log('Step 4 : getNextWord found ' + word)
                          
        getWordBack(word)
        })
        })
};

module.exports = getNextWord