const OutBondHook = function(outbondhook) {
var request = require("request");
const config = require('../config/default.json');

var options = { method: 'POST',
  url: config.outbondhookUrl,
  headers: {'content-type': 'application/json' },
  body: outbondhook,
  json: true
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);


});


};

module.exports = OutBondHook;