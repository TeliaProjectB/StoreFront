define([], function(){
	"use strict";
	
	function initModule(){





		//public
		this.update = function(swaggerJSON){
			if(swaggerJSON.info.version != undefined){
				document.getElementById("apiVersionInfo").innerHTML = swaggerJSON.info.version;
			}
			if(swaggerJSON.schemes != undefined){
				document.getElementById("apiTypeInfo").innerHTML = swaggerJSON.schemes;
			}

			if(swaggerJSON.host != undefined){
				document.getElementById("apiHostInfo").innerHTML = swaggerJSON.host;
			}

			if(swaggerJSON.info.description != undefined){
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