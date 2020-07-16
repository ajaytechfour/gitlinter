const winkNLP = require('wink-nlp');
// Load english language model — light version.
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);

const config = require('../config/default.json');

const CommitLinter = function( commitMessage ) {

    var LinterResponse = {
        'issueList' : RetriveIssueNumber( commitMessage ),
        'linterMessage' : LintMessage( commitMessage )
    }

    return LinterResponse;

}


function LintMessage(commitMessage) {
    var verbIndex = 1;
    var linterMessage = [];

    const doc = nlp.readDoc( commitMessage );

    if ( commitMessage.length > config.linter.commitMaxlength ) {
        linterMessage.push('Message Should be less than 100 char');
    }

    if ( config.linter.checkFirstWord.indexOf( doc.tokens().out()[0] ) > -1 ) {
        verbIndex = 3;
        if ( doc.tokens().out()[1]  != ':' ) {
            linterMessage.push('After identifire : not found');
         }
    }

    if ( doc.tokens().out(its.pos)[verbIndex] === 'VERB' ) {
        linterMessage.push('First Word should be Verb');
    }

    return linterMessage;


}

function RetriveIssueNumber( commitMessage ) {
    var issueList = [];

    const patterns = [
         { name: 'issueNumber', patterns: [ '[#] [CARDINAL]' ] }
     ];
    nlp.learnCustomEntities(patterns);
    const doc = nlp.readDoc( commitMessage );


    doc.customEntities()
   .each( ( customEntities, index ) => { // each entity and its index
              if ( customEntities.out(its.detail).type === 'issueNumber' ) {
                    issueList.push(customEntities.out(its.detail).value.replace('#',''));
              }

        } );


    return issueList;

}

module.exports = CommitLinter;