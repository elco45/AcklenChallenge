var request = require('request');
var url ='http://internal-devchallenge-2-dev.apphb.com/'
var guid = require('node-uuid');

exports.getResponse = {
  handler: function(req, reply) {
	request((url+"values/"+guid.v4()), function (error, response, body) {
	  if (!error) {
	    return reply(body)
	  }
	});
  }
}


