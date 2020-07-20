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


const text = 'fix: issue for the image close #123';
const patterns = [
  { name: 'issueNumber', patterns: [ 'close | [#] [CARDINAL]' ] }
];
nlp.learnCustomEntities(patterns);
const doc = nlp.readDoc(text);


//if ( doc.customEntities().out(its.detail).length > 0 ) {
//    if ( doc.customEntities().out(its.detail)[0].type == 'issueNumber' ) {
//    issuenumber = doc.customEntities().out(its.detail)[0].value
//    issuenumber = issuenumber.replace('#','');
//    console.log(issuenumber)
//
//    }




//}

console.log( doc.entities().out( its.type ) );
   console.log('aaaaaaaaa');

doc.customEntities()
   .each( ( customEntities, index ) => { // each entity and its index
              console.log(customEntities.out(its.detail).type );
              console.log( `${index}:`, customEntities.out() );
        } );






