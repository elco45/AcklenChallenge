angular.module('AcklenChallenge.Controllers').controller('HomeController', ['$scope','HomeService', function ($scope,HomeService) {
  	$scope.exampleObject = {text: "Hello ^.^"}
  	$scope.vowelList = ['a','A','e','E','i','I','o','O','u','U','y','Y']
  	$scope.fibonacciList = FillFibonacciList();

  	$scope.changeExampleObject = function(){
  	   	HomeService.GetResponse().then(function(response){
  	   		var result;
  	   		var param = {}
  	   		console.log(response)
  	   		if (response.data.algorithm == "IronMan") {
  	   			console.log("IronMan")
  	   			result = IronMan(response.data.words);
  	   			param.algorithm = "IronMan"
  	   		}else if (response.data.algorithm == "TheIncredibleHulk"){
  	   			console.log("TheIncredibleHulk")
  	   			result = TheIncredibleHulk(response.data.words);
  	   			param.algorithm = "TheIncredibleHulk"
  	   		}else if (response.data.algorithm == "Thor"){
  	   			console.log("Thor")
  	   			result = Thor(response.data.words,response.data.startingFibonacciNumber);
  	   			param.algorithm = "Thor"
  	   		}else if (response.data.algorithm == "CaptainAmerica"){
  	   			console.log("CaptainAmerica")
  	   			result = CaptainAmerica(response.data.words,response.data.startingFibonacciNumber);
  	   			param.algorithm = "CaptainAmerica"
  	   		}
  	   		param.encodedValue = result
  	   		param.guid = response.data.guid
  	   		console.log(param)
  	   		console.log(result)
  	   		HomeService.SendPost(param).then(function(response){
  	   			console.log(response)
  	   		});
  	   		//console.log(response)
  	   	})
  	   	/*
  	   	var tryr = ["x233z377mS","C610L987Mn","g15972584H41816765","Fl10946sH","m17711t28657r4636875025LsN121393196418d317811d","F514229M832040R","g1346269m","C2178309L3524578Mn","Th5702887s9227465sH14930352Rd","C24157817Mm39088169n63245986c102334155t165580141267914296N"]
  	   	//var tryr = ["x23","C6","g15","t110","Th"]
  	   	//console.log(CaptainAmerica(tryr,233))
  	   	console.log(tryr)
  	   	console.log("------------------------------------------")
  	   	console.log(AlternateConsonants(tryr))*/
  	   	//console.log(window.btoa(CaptainAmerica(tryr,233)))
  	   	/*
  	   	var tmp1 = ['dog','cat','5zebra','bird'];
  	   	var tmp2 = ['hEllo','bOok','read','NeEd','paliNdromE','happy'];
  	   	var str1 = "dog98cat100bird99";
  	   	var str2 = "dog*cat*bird"
  	   	var tmp3 = ['DoG','CaT','BiRd']
  	   	var tmp4 = ['dog','cat','bird']
		*/
  	   	/*
  	   	console.log(tmp1.sort());
  	   	console.log(ShiftAll(tmp2));
  	   	console.log(ConcatenateWithAscii(tmp4))
  	   	console.log(window.btoa(str1))
  	   	*/
/*
  	   	console.log(ShiftAll(tmp2))
  	   	console.log(ConcatenateWithAsterisks(tmp4))
  	   	console.log(window.btoa(ConcatenateWithAsterisks(tmp4))) 
  	   	*/

		/*
  	   	console.log(AlternateConsonants(tmp3))
  	   	console.log(ReplaceWithFibo(tmp4, 5))
  	   	*/
  	}

  	//Starting with algorithms
  	function IronMan(array){
  		//Step 1
  		array.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		});
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
  		newArray.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		});
  		newArray.reverse();
  		//Step 3
  		var result = window.btoa(ConcatenateWithAsterisks(newArray));
  		return result
  	}

  	function Thor(array, fibo){
  		console.log(array)
  		//Step 1 --> nodejs hypher
  		//Step 2
  		array.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		});
  		//Step 3
  		var newArray = AlternateConsonants(array);
  		//Step 4
  		newArray = ReplaceWithFibo(newArray, fibo);
  		//Step 5
  		var result = window.btoa(ConcatenateWithAsterisks(newArray));
  		return result
  	}

  	function CaptainAmerica(array,fibo){
  		//Step 1
  		var newArray = ShiftAll(array);
  		//Step 2
  		newArray.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		});
  		newArray.reverse();
  		//Step 3
  		newArray = ReplaceWithFibo(newArray, fibo);
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
        result = array[0] + array[array.length-1].charCodeAt(0);
        for (var i = 1; i < array.length; i++){
            result += array[i] + array[i-1].charCodeAt(0);
        }
        return result;
    }

    function ConcatenateWithAsterisks(array){
    	var result = "";
    	for (var i = 0; i < array.length; i++){
    		if (i!=array.length-1) {
    			result += (array[i] + '*');
    		}else{
    			result += array[i];
    		}
    		
    	}
    	return result;
    }

    function AlternateConsonants(array){
    	var cont = 0;
		for (var i = 0; i < array.length; i++){
			cont = 0;
			for (var j = 0; j < array[i].length; j++){
				if ($scope.vowelList.indexOf(array[i][j]) == -1 && isNaN(array[i][j])) {//is Consonant
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
