const winkNLP = require('wink-nlp');
// Load english language model — light version.
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);

const config = require('../config/default.json');

const CommitLinter = function(commitMessage) {

if ( commitMessage.length > config.commitMaxlength )
    return 'Message Should be less than 100 char';


const doc = nlp.readDoc(commitMessage);

verbIndex = 1;

if ( config.checkFirstWord.indexOf( doc.tokens().out()[0] ) > -1 ) {
    verbIndex = 3;
    if ( doc.tokens().out()[1]  === ':' )
        return 'After identifire : not found';


}

if ( doc.tokens().out(its.pos)[verbIndex] === 'VERB' )
    return 'First Word should be Verb';


return 'commit message is ok';
}

module.exports = CommitLinter;