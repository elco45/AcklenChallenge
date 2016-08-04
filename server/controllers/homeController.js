var request = require('request');
var url ='http://internal-devchallenge-2-dev.apphb.com/'
var guid = require('node-uuid');
var Hypher = require('hypher');
english = require('hyphenation.en-us');
h = new Hypher(english);

exports.getResponse = {
  handler: function(req, reply) {
	request((url+"values/"+guid.v4()), function (error, response, body) {
	  	if (!error) {
		  	var all = JSON.parse(body);
		  	if (all.algorithm != "Thor") {
	 			return reply(body)
		  	}else{
		  		var newArray = [];
		  		var temp;
		  		for (var i = 0; i < all.words.length; i++){
		  			temp = h.hyphenate(all.words[i]);
		  			for (var j = 0; j < temp.length; j++){
		  				newArray.push(temp[j])
		  			}
		  		}
		  		all.words = newArray;
		  		return reply(all)
		  	}
	  	}
	});
  }
}



