angular.module('AcklenChallenge.Controllers').controller('HomeController', ['$scope','HomeService', function ($scope,HomeService) {
  	$scope.exampleObject = {text: "Hello ^.^"}
  	$scope.vowelList = ['a','A','e','E','i','I','o','O','u','U','y','Y']
  	$scope.fibonacciList = FillFibonacciList();

  	$scope.changeExampleObject = function(){
  	   	/*HomeService.GetResponse().then(function(response){
  	   		var result = IronMan(response.data.words)
  	   		console.log(response)
  	   	})*/
  	   	var fruits = ["Banana", "Orange", "Apple", "BiRd"];
  	   	var result = ReplaceWithFibo(fruits,5)
  	   	console.log(result)
  	}

  	//Starting with algorithms
  	function IronMan(array){
  		//Step 1
  		array.sort();
  		//Step 2
  		var newArray = ShiftAll(array);
  		//Step 3 and 4
  		var result = window.btoa(ConcatenateWithAscii(newArray));
  		return result
  	}

  	function TheIncredibleHulk(array){
  		//Step 1
  		var newArray = ShiftAll(array);
  		//Step 2
  		newArray.sort();
  		newArray.reverse();
  		//Step 3
  		var result = window.btoa(ConcatenateWithAsterisks(newArray));
  		return result
  	}

  	function Thor(array, fibo){
  		//Step 1 --> nodejs hypher
  		//Step 2
  		array.sort();
  		//Step 3
  		var newArray = AlternateConsonants(array);
  		//Step 4
  		newArray = ReplaceWithFibo(array, fibo);
  		//Step 5
  		var result = window.btoa(ConcatenateWithAsterisks(newArray));
  		return result
  	}

  	function CaptainAmerica(array){
  		//Step 1
  		var newArray = ShiftAll(array);
  		//Step 2
  		newArray.sort();
  		newArray.reverse();
  		//Step 3
  		newArray = ReplaceWithFibo(array, fibo);
  		//Step 4 and 5
  		var result = window.btoa(ConcatenateWithAscii(newArray));
  		return result
  	}

    function ShiftAll(array){
        var newArray=[];
        for (var i = 0; i < array.length; i++){
            newArray.push(ShiftVowelToTheRight(array[i]));
        }
        return newArray;
    }

  	function ShiftVowelToTheRight(word){
        var newWord = word;
        for (var i = 0; i < word.length; i++){
            if ($scope.vowelList.indexOf(word[i]) == -1){
                continue;
            }else if ($scope.vowelList.indexOf(word[i]) >= 0 && $scope.vowelList.indexOf(word[i + 1]) >= 0){
                newWord = Swap(newWord, i, i + 1);
                i++;
            }else{
            	newWord = Swap(newWord, i, i+1);
            }
        }
        return newWord;
    }

    function Swap(word,first,last){
    	var char1 = word[first];
    	var char2 = word[last];
    	var newWord = word;
    	if (first != word.length -1){
    		newWord = word.substr(0,first)+char2+char1+word.substr(last+1);
    	}else{
    		if (word.length >= 2) {
    			newWord = char1 + word.substr(0,word.length-1);
    		}
    	}
    	return newWord;
    }

    function ConcatenateWithAscii(array){
        var result = "";
        result = array[0] + array[0].charCodeAt(0);
        for (var i = 1; i < array.length; i++){
            result += array[i] + array[0].charCodeAt(0);
        }
        return result;
    }

    function ConcatenateWithAsterisks(array){
    	var result = "";
    	for (var i = 0; i < array.length; i++){
    		result += array[i] + "*";
    	}
    }

    function AlternateConsonants(array){
    	var cont = 0;
		for (var i = 0; i < array.length; i++){
			cont = 0;
			for (var j = 0; j < array[i].length; j++){
				if ($scope.vowelList.indexOf(array[i][j]) == -1) {//is Consonant
					if (cont%2 == 0) {
						if(j == array[i].length-1){
							array[i] = array[i].substr(0,j) + array[i][j].toUpperCase(); 
						}else{
							array[i] = array[i].substr(0,j) + array[i][j].toUpperCase() + array[i].substr(j+1);
						}
					}else{
						if(j == array[i].length-1){
							array[i] = array[i].substr(0,j) + array[i][j].toLowerCase(); 
						}else{
							array[i] = array[i].substr(0,j) + array[i][j].toLowerCase() + array[i].substr(j+1);
						}
					}
					cont++
				}
			}
		}
		return array;
    }

    function ReplaceWithFibo(array, fibo){
    	var cont = $scope.fibonacciList.indexOf(fibo);
    	for (var i = 0; i < array.length; i++){
    		for (var j = 0; j < array[i].length; j++){
    			if ($scope.vowelList.indexOf(array[i][j])>=0) {// is a vowel
    				if(j == array[i].length-1){
						array[i] = array[i].substr(0,j) + $scope.fibonacciList[cont]; 
					}else{
						array[i] = array[i].substr(0,j) + $scope.fibonacciList[cont] + array[i].substr(j+1);
					}
					cont++;
    			}
    		}
    	}
    	return array;
    }
    
    function FillFibonacciList(){
		var array = [0,1]; 
		for (var i = 2; i <= 60; i++){
		    array.push(array[i-2] + array[i-1]);
		}
		return array;
    }
}]);
