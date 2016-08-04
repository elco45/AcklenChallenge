var request = require('request');
var urlApi ='http://internal-devchallenge-2-dev.apphb.com/'
var guid = require('node-uuid');
var Hypher = require('hypher');
english = require('hyphenation.en-us');
h = new Hypher(english);

exports.getResponse = {
  	handler: function(req, reply) {
  		var uuid = guid.v4()
		request((urlApi+"values/"+uuid), function (error, response, body) {
		  	if (!error) {
			  	var all = JSON.parse(body);
			  	all.guid = uuid;
			  	if (all.algorithm != "Thor") {
		 			return reply(all);
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

exports.getSecret = {
	handler: function (request, reply) {
		console.log(request.payload.asd)
        const response = reply('The secret message is:' + request.payload.asd)
        response.header('Content-Type', 'application/json')
    }
}

exports.sendPost = {
	handler: function (req, reply){
		console.log(req.payload.encodedValue)
		var m = urlApi+"values/"+req.payload.guid+"/"+req.payload.algorithm
		console.log(m)
		request({
			url: m,
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"},
			encodedValue: req.payload.encodedValue,
			emailAddress: "guau@guau.com",
			name: "Meow",
			webHookUrl: "http://452082cc.ngrok.io/v1/secret",
			repoUrl: "meow@git.com"},
		function (error, response, body) {
			if(!error){
				console.log("---------------------------------------------------")
				console.log(body)
				return reply(response)	
			}else{
				return reply(error)
			}
			
		});
	}
}



