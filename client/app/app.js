var app = angular.module('AcklenChallenge', ['ui.router', 'AcklenChallenge.Services', 'AcklenChallenge.Controllers']);
angular.module('AcklenChallenge.Controllers', []);
angular.module('AcklenChallenge.Services', []);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('home');
	$stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/views/home.html'
        });
}])
