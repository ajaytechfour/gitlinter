const winkNLP = require('wink-nlp');
// Load english language model — light version.
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);

const config = require('../config/default.json');

const CommitLinter = function( commitMessage ) {

    var LinterResponse = {
        'issueSummary' : RetriveIssueNumber( commitMessage ),
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
    var keywords = [];
    var details = [];

    const patterns = [
        { name: 'KeywordIssueNumber', patterns: [ '[fix|fixes|close|closes|reference|references] [#] [CARDINAL]' ], mark: [2,2]},
        { name: 'KeywordIssueNumber2', patterns: [ '[fix|fixes|close|closes|reference|references] [:] [#] [CARDINAL]' ], mark: [3,3]},
        { name: 'IssueNumber', patterns: [ '[#] [CARDINAL]' ], mark: [1,1]},
        { name: 'Keyword', patterns: [ '[fix|fixes|close|closes|reference|references]' ]},
    ];
    nlp.learnCustomEntities(patterns);
    const doc = nlp.readDoc( commitMessage );


    doc.customEntities()
   .each( ( customEntities, index ) => { // each entity and its index
              if ( ['KeywordIssueNumber', 'KeywordIssueNumber2'].includes(customEntities.out(its.detail).type) ) {
                    issueList.push(customEntities.out(its.detail).value);
                    var token = doc.tokens().itemAt( doc.customEntities().itemAt(index).tokens().itemAt(0).index()-2 );
                    var DetailsArr = { 'IssueNumber' : customEntities.out(its.detail).value , 'Keyword' : token.out() }

                    details.push( DetailsArr );
                    keywords.push( token.out() );

              }
              else if ( ['IssueNumber'].includes(customEntities.out(its.detail).type) ) {
                    issueList.push(customEntities.out(its.detail).value);
              }

              else if ( ['Keyword'].includes(customEntities.out(its.detail).type) ) {
                    keywords.push( customEntities.out(its.detail).value );
              }


        } );


    return { 'issueList': issueList, 'keywords': keywords, 'details': details };

}

module.exports = CommitLinter;