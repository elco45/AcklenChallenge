var homeController = require('./controllers/homeController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, results')}}},
					{method: 'GET', path: '/v1/getResponse', config: homeController.getResponse},
					{method: 'POST', path: '/v1/secret', config: homeController.getSecret},
					{method: 'POST', path: '/v1/sendPost', config: homeController.sendPost}
				];
