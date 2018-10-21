define([], function(){
	"use strict";
	
	function initModule(){
		var list = [];


		this.addRootParam = function(param){
			list.push(param);
		}






		this.flushParameterList = function(){
			list.length = 0;
		}



		this.getParameters = function(){
			console.log(list);
			return list;
		}
		

	}return{
		init: initModule
	}


});