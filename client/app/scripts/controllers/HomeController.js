angular.module('AcklenChallenge.Controllers').controller('HomeController', ['$scope','HomeService', function ($scope,HomeService) {
  	$scope.exampleObject = {text: "Hello ^.^"}
  	$scope.vowelList = ['a','A','e','E','i','I','o','O','u','U','y','Y']
  	$scope.fibonacciList = FillFibonacciList();
  	$scope.sampleWords = ["drool", "cats", "clean", "code", "dogs", "materials", "needed", "this", "is", "hard","what", "are", "you", "smoking", "shot", "gun", "down", "river", "super", "man", "rule", "acklen","developers", "amazing", "home", "notch", "light", "saw"];


  	$scope.changeExampleObject = function(){
  		for (var i = 0; i < 20; i++){
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
  	   	}
  	   	/*
  	   	var tryr = ["Bl13Sh21Ng","aShUpH","d610C987d1597R","d2584C4181d6765R","1094617711rD28657x","F46368m75025R","g121393BbL196418nG","g317811M","514229w832040Ft1346269","21783093524578Ns5702887L"]
  	   	//var tryr = ["x23","C6","g15","t110","Th"]
  	   	//console.log(CaptainAmerica(tryr,233))
  	   	console.log(tryr)
  	   	console.log("------------------------------------------")
  	   	console.log(SeparateWords(tryr))
  	   	console.log(AlternateConsonants(SeparateWords(tryr)))
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
  		//Step 1 
  		array = SeparateWords(array);
  		//Step 2
  		array.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		});
		console.log(array)
  		//Step 3
  		var newArray = AlternateConsonants(array);
  		console.log(newArray)
  		//Step 4
  		newArray = ReplaceWithFibo(newArray, fibo);
  		console.log(newArray)
  		//Step 5 and 6
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

    function SeparateWords(array){
        var newArray = [];
        for (var i = 0; i < array.length; i++){
            if (MoreThanOne(array[i])){
                var tmp = "";
                var tmp2 = "";
                for (var j = 0; j < array[i].length; j++){
                    tmp += array[i][j];
                    tmp2 = tmp;
                    if ($scope.sampleWords.indexOf(tmp2.toLowerCase())>=0){
                        newArray.push(tmp);
                        tmp = "";
                        tmp2 = "";
                    }
                }
            }else{
                newArray.push(array[i]);
            }
        }
        return newArray;
    }


    function MoreThanOne(word){
        var cont =0;
        for (var i = 0; i < $scope.sampleWords.length; i++){
            if (word.toLowerCase().indexOf($scope.sampleWords[i])>=0) {
                 cont++;
            }
        }
        if (cont > 1){
            return true;
        }
        return false;
    }

    function AlternateConsonants(array){
    	var cont = 0;
    	if (isLowerCase(firstLetter(array))) {
			cont = 1;
		}
		for (var i = 0; i < array.length; i++){
			for (var j = 0; j < array[i].length; j++){
				if ($scope.vowelList.indexOf(array[i][j]) == -1 && isNaN(array[i][j])) {//is Consonant and not numeric
					if (cont%2 == 0) {//starts with upperCase
						if(j == array[i].length-1){
							array[i] = array[i].substr(0,j) + array[i][j].toUpperCase(); 
						}else{
							array[i] = array[i].substr(0,j) + array[i][j].toUpperCase() + array[i].substr(j+1);
						}
					}else{//starts with lowerCase
						if(j == array[i].length-1){
							array[i] = array[i].substr(0,j) + array[i][j].toLowerCase(); 
						}else{
							array[i] = array[i].substr(0,j) + array[i][j].toLowerCase() + array[i].substr(j+1);
						}
					}
					cont++;
				}
			}
		}
		return array;
    }

    function isLowerCase(str) {
	    return str !== str.toUpperCase();
	}

	function firstLetter(array) {
		for (var i = 0; i < array.length; i++){
			for (var j = 0; j < array[i].length; j++){
				if (isNaN(array[i][j])) {
					return array[i][j];
				}
			}
		}
		return -1;
	}

    function ReplaceWithFibo(array, fibo){
    	var cont = $scope.fibonacciList.indexOf(fibo);
    	var newArray = array;
    	for (var i = 0; i < array.length; i++){
    		for (var j = 0; j < array[i].length; j++){
    			if ($scope.vowelList.indexOf(array[i][j])>=0) {// is a vowel
    				if(j == array[i].length-1){
						newArray[i] = array[i].substr(0,j) + $scope.fibonacciList[cont]; 
					}else{
						newArray[i] = array[i].substr(0,j) + $scope.fibonacciList[cont] + array[i].substr(j+1);
					}
					cont++;
    			}
    		}
    	}
    	return newArray;
    }
    
    function FillFibonacciList(){
		var array = [0,1]; 
		for (var i = 2; i <= 100; i++){
		    array.push(array[i-2] + array[i-1]);
		}
		return array;
    }
    
}]);
