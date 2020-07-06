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
const text = 'fix issue emp profile image url'



const doc = nlp.readDoc(text);


//console.log( doc.tokens().out(its.type) );
//console.log(doc.tokens().out(its.pos));

console.log(doc.tokens().out(its.pos));

//console.log(doc.entities().out());
