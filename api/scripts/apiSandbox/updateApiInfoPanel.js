define([], function(){
	"use strict";
	
	function initModule(){

		/*
		This module extracts generalinformation about the API and puts them in the aAPI info table
		*/



		//public
		this.update = function(swaggerJSON){
			if(swaggerJSON.info.version != undefined){
				if(document.getElementById("apiVersionInfo") == null){
					return;
				}
				document.getElementById("apiVersionInfo").innerHTML = swaggerJSON.info.version;
			}
			if(swaggerJSON.schemes != undefined){
				if(document.getElementById("apiTypeInfo") == null){
					return;
				}
				document.getElementById("apiTypeInfo").innerHTML = swaggerJSON.schemes;
			}

			if(swaggerJSON.host != undefined){
				if(document.getElementById("apiHostInfo") == null){
					return;
				}
				document.getElementById("apiHostInfo").innerHTML = swaggerJSON.host;
			}

			if(swaggerJSON.info.description != undefined){
				if(document.getElementById("apiSwagDescInfo") == null){
					return;
				}
				document.getElementById("apiSwagDescInfo").innerHTML = parseDescription(swaggerJSON.info.description);
			}

			
		}


		function parseDescription(string){
			string = string.replace(/\n/g, "</br></br>");
			return string;
		}
		

	}return{
		init: initModule
	}


});