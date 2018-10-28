define([], function(){
	"use strict";
	
	function initModule(swaggerJSON, swaggerHand){





		this.getDescription = function(swaggerObject){
			var description = swaggerHand.swagAccess(swaggerObject, "description");
			if(description == undefined){
				description = swaggerHand.swagAccess(swaggerObject, "items").description;
				if(description == undefined){
					description = "";
				}
			}

			var arrayDescription = document.createElement("div");
			arrayDescription.className = "inputDescription";
			arrayDescription.innerHTML = description;
			return arrayDescription;
		}
		


		this.ifInputCheckIfRequired = function(swaggerObject, inputName){
			if(swaggerObject.required == undefined){
				return;
			}
			if(typeof swaggerObject.required == "boolean"){
				if(swaggerObject.required){
					return true;
				}
			}
			//assume swaggerObject.required is an array
			if(typeof inputName == "string"){
				for(var i=0; i<swaggerObject.required.length; i++){
					if(swaggerObject.required[i] == inputName){
						return true;
					}
				}
			}
			
			if(typeof swaggerObject.required == "boolean"){
				if(swaggerObject.required){
					return true;
				}
			}
			return false;
		}




		this.noInfiniteLoopInReferences = function(pathName){
			//Some faulty swagger files may have an infinite loop of references, this is a simple method of detecting a bad repetition by looking at the names
			var pathNames = pathName.split(".");
			if(pathNames == undefined){
				return true;
			}

			if(pathNames.length <= 4){
				return true;
			}

			var repetitionsOfPath = 0;
			for(var x=0; x<pathNames.length; x++){
				//Repetitions of one
				repetitionsOfPath = 0;
				for(var y=0; y<pathNames.length; y++){
					if(pathNames[y] == pathNames[x]){
						repetitionsOfPath++;
					}
				}
				if(repetitionsOfPath > 2){
					return false;
				}

				//Repetitions of two
				repetitionsOfPath = 0;
				for(var y=x; y<pathNames.length; y+=2){
					if(pathNames[y] == undefined){
						break;
					}
					if(pathNames[y] == pathNames[x]){
						repetitionsOfPath++;
					}
				}
				if(repetitionsOfPath >= 1){
					return false;
				}
			}
			

			return true;
		}





		this.sortObjectProperties = function(swaggerObject, objectProperties){
			var swaggerPropArr = swaggerHand.swagAccess(swaggerObject, "properties");

			objectProperties.sort(function(a, b){
				a = swaggerPropArr[a];
				b = swaggerPropArr[b];

				var depthOfA = getDepthOfParameter(a, 0);

				var depthOfB = getDepthOfParameter(b, 0);

				return depthOfA - depthOfB;
			});
			//var prop = swaggerHand.swagAccess(swaggerObject, "properties")[objectProperties[i]];
		}


		this.sortArrayItems = function(swaggerObject){
			if(swaggerObject.items != undefined){
				swaggerObject.items.sort(function(a, b){

					var depthOfA = getDepthOfParameter(a, 0);

					var depthOfB = getDepthOfParameter(b, 0);

					return depthOfA - depthOfB;
				});
			}
		}


		function getDepthOfParameter(parameter, depth){
			parameter =  swaggerHand.parseSwaggerObject(swaggerJSON, parameter);
			
			if(parameter.type == undefined){
				return depth;
			}

			if(parameter.type == "object"){
				depth++;
				var keys = Object.keys(parameter.properties);
				for(var i=0; i<keys.length; i++){
					var depthTest = getDepthOfParameter(parameter.properties[keys[i]], depth);
					if(depthTest > depth){
						depth = depthTest;
					}
				}

				return depth;
			}

			if(parameter.type == "array"){
				depth++;
				for(var i=0; i<parameter.items.length; i++){
					var depthTest = getDepthOfParameter(parameter[i], depth);
					if(depthTest > depth){
						depth = depthTest;
					}
				}
				return depth;
			}


			return depth;
		}



	}return{
		init: initModule
	}


});