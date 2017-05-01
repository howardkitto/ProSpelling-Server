const Words = require('../models/Words')


// function getNextWord(level, callback) 
//go to the database and count all the words with the right level
//     {Words.count({'level':level},
    
//         function (err,c){
//         if(err){return err}
//         console.log('Count is ' + c)
// //generate a random number to select a word
//          var wordNumber = Math.floor((Math.random() * c) + 1);
//          console.log('word number ' + wordNumber)
// //find the word that corresponds to the random number
//          Words.findOne().skip(wordNumber).exec(
//     function (err, word) {
// //send the word back in a callback function
//       return callback(word.word)

//   });

// } )
// }

function getNextWord(newChallenge){

//go to the database and count all the words with the right level
    Words.count({'level':newChallenge.startingLevel},
    
        function (err,c){
        if(err){return err}
        console.log('Count is ' + c)

// generate a random number to select a word        
        const wordNumber = Math.floor((Math.random() * c) + 1);
        console.log('word number ' + wordNumber)
    });

//tricky part - find the corresponding word and return the whole challenge



    console.log('called getNextWord as callback' + newChallenge)

return ( {'challengeId':newChallenge._id, 
            'userUuid' : newChallenge.user, 
            'startingLevel':newChallenge.startingLevel,
            'word':'bird world'})
}


//this needs to be in the route
// function funtion tocallgetNextWord(level)
// {
    

//     var theWordNumber = availableWords(level, 
//         function(word)
//         {console.log('Got word ' + typeof(word))
//     return word
// })

// }

module.exports = getNextWord