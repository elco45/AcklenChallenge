angular.module('AcklenChallenge.Services').factory('HomeService', ['$http',
	function($http){
		var baseUrl = 'http://localhost:8000/';
		return{
			GetResponse: function(payload){
	          return $http.get(baseUrl + "v1/getResponse", payload);
      		}
		}
	}
]);
