var hapi = require('hapi');
var inert = require('inert');
var routes = require('./routes');


var server = new hapi.Server();
server.connection({
    port: ~~process.env.PORT || 8000,
    routes: { cors: {
                    credentials: true,
                    origin: ["*"]
                }
              }
});



server.register(inert, function(err){

	server.route(routes.endpoints);
    server.route({
      method: 'POST',
      path: '/secret',
      handler: function (request, reply) {
        const response = reply('The secret message is:' + request.payload.Body)
        response.header('Content-Type', 'application/json')
      }
    })
	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});
