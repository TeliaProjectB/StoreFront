//Require is self executing
//In the first bracket you write the source directory to the module1.js
//The loaded module becomes accessable as a function parameter "helloWorldModule"
require(["module1"], function(helloWorldModule){
	//Vanilla javascript only inside this function
	//To access it's functions make an object from it
	var obj = new helloWorldModule.init();
	//Not we can access it's public functions, like a class
	obj.addText();


});

//Multiple modules can be loaded in one class:
/*
require(["module1", "module2", "path/Module3"], function(helloWorldModule, module2, module3){


});

*/