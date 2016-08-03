var homeController = require('./controllers/homeController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, results')}}},
					{method: 'GET', path: '/v1/getResponse', config: homeController.getResponse}
				];
