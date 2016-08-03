angular.module('AcklenChallenge.Controllers').controller('HomeController', ['$scope','HomeService', function ($scope,HomeService) {
	$scope.title = "Hola, mundo."
  	$scope.exampleObject = {text: "The answer is:"}

  	$scope.changeExampleObject = function(){
  	   	$scope.exampleObject = {text: "Adios, mundo."};
  	   	var param = {
	        w: "asf"
	      }
  	   	HomeService.GetResponse(param).then(function(response){
  	   		console.log(response)
  	   	})
  	}
}]);
