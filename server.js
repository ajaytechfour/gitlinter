var express = require('express');
var app = express();
var fs = require("fs");

var winkNLP = require( 'wink-nlp' );
var its = require( 'wink-nlp/src/its.js' );
var model = require( 'wink-eng-lite-model' );
var Perceptron = require( 'wink-perceptron' );


let timelinemodel = require( './src/timeline/timeline-model' );
let predictsearchmod = require( './src/search/search-model' );

//app.use(function(req, res, next) {
//res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//next();
//});

app.use(function (req,res,next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,OPTIONS');
    //res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, x-access-token');
    next();
});

app.use(express.json());

app.get('/timeline/:wikiname', function (req, res) {
    var wikiname =req.params.wikiname
    var timelinerepnse = timelinemodel.processtimeline(wikiname)
    res.end( timelinerepnse );
});

app.get('/search/predict', function (req, res) {
    //let bodyreq = req.body;
    txtsearch = req.query.txtsearch
    var predictsearchresponse = predictsearchmod.predictResult(txtsearch)
    res.end( predictsearchresponse );
});

var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
