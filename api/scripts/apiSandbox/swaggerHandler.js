define([], function(){
	"use strict";
	
	function initModule(swaggerJSON){




		
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

			//Get ref inside schema
			objectRefVals = {};
			if(obj.schema != undefined){
				if(obj.schema.$ref != undefined){
					objectRefVals = parseUrl(swaggerJSON, obj.schema.$ref);

					//get each property of referenced definitions object and add them to the object
					var keys = Object.keys(objectRefVals);
					for(var i=0; i<keys.length; i++){
						obj[keys[i]] = objectRefVals[keys[i]];
					}

				}
			}




			


			//Make common properties that are undefined into an empty string
			/*if(obj.description === undefined){
				obj.description = "";
			}
			if(obj.type === undefined){
				obj.type = "";
			}
			if(obj.name === undefined){
				obj.name = "";
			}*/

			return obj;
		}
		


		this.swagAccess = function(object, property){
			if(object.$ref != undefined){
				var objectRefVals = {};
				if(object.$ref != undefined){
					objectRefVals = parseUrl(swaggerJSON, object.$ref);
				}

				//get each property of referenced definitions object and add them to the object
				if(typeof objectRefVals == "object"){
					var keys = Object.keys(objectRefVals);
					for(var i=0; i<keys.length; i++){
						object[keys[i]] = objectRefVals[keys[i]];
					}
					object.$ref = undefined;
				}else if(typeof objectRefVals == "array"){
					for(var i=0; i<objectRefVals.length; i++){
						object.push(objectRefVals[i]);
					}
				}
				delete object.$ref;
			}

			if(object[property] == undefined){
				return "";
			}

			if(object[property].$ref != undefined){
				var objectRefVals = {};
				if(object[property].$ref != undefined){
					objectRefVals = parseUrl(swaggerJSON, object[property].$ref);
				}

				//get each property of referenced definitions object and add them to the object
				if(typeof objectRefVals == "object"){
					var keys = Object.keys(objectRefVals);
					for(var i=0; i<keys.length; i++){
						object[property][keys[i]] = objectRefVals[keys[i]];
					}
					object[property].$ref = undefined;
					
				}else if(typeof objectRefVals == "array"){
					for(var i=0; i<objectRefVals.length; i++){
						object[property].push(objectRefVals[i]);
					}
				}
				delete object[property].$ref;
				
			}

			return object[property];
		}

	}return{
		init: initModule
	}


});