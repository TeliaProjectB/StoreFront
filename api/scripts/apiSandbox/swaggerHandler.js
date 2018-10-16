define([], function(){
	"use strict";
	
	function initModule(){




		
		this.getDefinitionFromRef = function(swagger, $ref){
			return parseUrl(swagger, $ref)
		}


		function parseUrl(swagger, $ref){
			if($ref == undefined){
				return {};
			}
			//Handle # root of document
			var urlParts = $ref.split("/");
			if(urlParts[0] == "#"){
				return swagger[urlParts[1]][urlParts[2]];
			}
		}


		this.parseSwaggerObject = function(swaggerJSON, obj){
			var objectRefVals = {};
			if(obj.$ref != undefined){
				objectRefVals = parseUrl(swaggerJSON, obj.$ref);
			}

			//get each property of referenced definitions object and add them to the object
			var keys = Object.keys(objectRefVals);
			for(var i=0; i<keys.length; i++){
				obj[keys[i]] = objectRefVals[keys[i]];
			}



			//Make common properties that are undefined into an empty string
			if(obj.description === undefined){
				obj.description = "";
			}
			if(obj.type === undefined){
				obj.type = "";
			}
			if(obj.name === undefined){
				obj.name = "";
			}

			return obj;
		}
		

	}return{
		init: initModule
	}


});