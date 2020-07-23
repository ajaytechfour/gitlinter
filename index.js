// Load "wink-nlp" package.
const winkNLP = require('wink-nlp');
// Load english language model — light version.
//
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );

const model = require('wink-eng-lite-model');
// Instantiate wink-nlp.
const nlp = winkNLP(model);


//const text = 'HelLo World!';
//const doc = nlp.readDoc(text);
//console.log(doc.out());

//console.log( doc.tokens().out(its.type) );
// -> [ 'Hello', 'World', '!' ]

//const text = 'Masking on Mobile & Email for Agent on popup';
//const text = 'fix issue emp profile image url close #123'



//const doc = nlp.readDoc(text);

//console.log( doc.tokens().out(its.type) );
//console.log(doc.tokens().out(its.pos));

//console.log(doc.tokens().out(its.pos));

//console.log(doc.entities().out());


//const text = 'fix: issue for the image close #123';
//const patterns = [
//  { name: 'issueNumber', patterns: [ 'close | [#] [CARDINAL]' ], mark: [1,2]}
//];
//nlp.learnCustomEntities(patterns);
//const doc = nlp.readDoc(text);


//if ( doc.customEntities().out(its.detail).length > 0 ) {
//    if ( doc.customEntities().out(its.detail)[0].type == 'issueNumber' ) {
//    issuenumber = doc.customEntities().out(its.detail)[0].value
//    issuenumber = issuenumber.replace('#','');
//    console.log(issuenumber)
//
//    }




//}

//console.log(doc.customEntities().out().join( '\n' ));
//console.log(doc.customEntities().itemAt(0).tokens().itemAt(0).index()-2)
//console.log(doc.customEntities().itemAt(0).tokens().itemAt(0).index())

//console.log(doc.customEntities().out());

//console.log( doc.entities().out( its.type ) );
//console.log('aaaaaaaaa');

//doc.customEntities()
//   .each( ( customEntities, index ) => { // each entity and its index
 //             console.log(customEntities.out(its.detail).type );
  //            console.log( `${index}:`, customEntities.out() );
   //     } );


//text = 'This ok commit closes #534 and fix #876 and also closes and #65765';

//text = 'This ok commit #534 and #876 and also closes';

text = 'This is commit only';

const patterns = [
  { name: 'KeywordIssueNumber', patterns: [ '[fix|fixes|close|closes|reference|references] [#] [CARDINAL]' ], mark: [2,2]},
  { name: 'KeywordIssueNumber2', patterns: [ '[fix|fixes|close|closes|reference|references] [:] [#] [CARDINAL]' ], mark: [3,3]},
  { name: 'IssueNumber', patterns: [ '[#] [CARDINAL]' ], mark: [1,1]},
  { name: 'Keyword', patterns: [ '[fix|fixes|close|closes|reference|references]' ]},
];

nlp.learnCustomEntities(patterns);
doc = nlp.readDoc(text);


//console.log(doc.customEntities().out(its.detail));
//console.log(doc.customEntities().out().join( '\n' ));

//console.log(`\ntokens = ${doc.tokens().length()}`);

//console.log(`\ncustom entities = ${doc.customEntities().length()}`);

//console.log(doc.customEntities().out().join( '\n' ));

//console.log(doc.customEntities().itemAt(0).tokens().itemAt(0).index()-2)

//console.log(doc.customEntities().itemAt(0))


var issueList = [];
doc.customEntities()
   .each( ( customEntities, index ) => { // each entity and its index
              if ( customEntities.out(its.detail).type === 'IssueNumber') {
                    issueList.push(customEntities.out(its.detail).value);
              }
              if ( customEntities.out(its.detail).type === 'KeywordIssueNumber' ) {
                    issueList.push(customEntities.out(its.detail).value);
              }

        } );

//console.log(issueList);


if ( [1, 2, 3].includes(2) ) {
    //console.log('testt');
}

var issueList = [];
var keywords = [];
var details = [];

//issueAction = ['details','issueList','keywords']

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



literSummary = { 'issueList': issueList, 'keywords': keywords, 'details': details }

console.log(literSummary);



