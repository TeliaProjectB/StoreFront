define([], function(){
	function initModule(){
		//Vanilla javascript only inside this function
		//My private variables:
		var htmlText = "Hello world!";
		//Public functions
		this.addText = function(){
			var element = document.getElementById("testDiv");
			element.innerHTML = htmlText;

			//I can call my own private functions:
			f();
		}


		//Private functions
		function f(){
			console.log("My private function has been executed");
		}
		

	}return{
		init: initModule
	}
});

//In a similar way as require defined can also import other modules:

/*
define(["codeSource"], function(moduleName){
	function initModule(){
	var obj = new moduleName.init();
		

	}return{
		init: initModule
	}


});
*/