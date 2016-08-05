var request = require('request');
var urlApi ='http://internal-devchallenge-2-dev.apphb.com/'
var guid = require('node-uuid');
var webHook = "http://379b3dfe.ngrok.io/v1/secret"

exports.getResponse = {
  	handler: function(req, reply) {
  		var uuid = guid.v4()
		request((urlApi+"values/"+uuid), function (error, response, body) {
		  	if (!error) {
			  	var all = JSON.parse(body);
			  	all.guid = uuid;
		 		return reply(all);
		  	}
		});
  	}
}

exports.getSecret = {
	handler: function (request, reply) {
		console.log("------->"+request.payload.secret)

        const response = reply('The secret message is:' + request.payload.secret)
        response.header('Content-Type', 'application/json')
    }
}

exports.sendPost = {
	handler: function (req, reply){
		var val = req.payload.encodedValue;
		var ur = urlApi+"values/"+req.payload.guid+"/"+req.payload.algorithm;
		var param = {
			"url": ur,
			"headers": {
				"Content-Type": "application/json",
				"Accept": "application/json"},
			"form": {
				"encodedValue": val,
				"emailAddress": "guau@guau.com",
				"name": "Meow",
				"webHookUrl": webHook,
				"repoUrl": "meow@git.com"}};
		request.post(param, function (error, response, body) {
			if(!error){

				console.log("---------------------------------------------------")
				console.log(body)
				return reply(response)	
			}else{
				return reply(error)
			}
			return reply('ok')
		});
		
	}
}



