define([], function(){
	"use strict";
	
	function initModule(swaggerHand, swaggerJSON, paramValuesManager){
		var inputFieldCounter = 0;




		this.parseInput = function(swaggerObject, index){
			var paramInType = swaggerHand.swagAccess(swaggerObject, "in");
			var name = swaggerHand.swagAccess(swaggerObject, "name");

			var newParamPath = {
				next: [],
				in: paramInType,
				name: name,
				type: "root",
			};
			paramValuesManager.addRootParam(newParamPath);


			return parseinputObject(swaggerObject, newParamPath, index, "", false);
		}
		

		function parseinputObject(swaggerObject, inputParents, index, objectPath, printName){
			//console.log(swaggerObject);
			var bodyInputContainer = document.createElement("div");

			var returnedType = "";
			
			if(swaggerObject.type == "array"){
				returnedType = "array";
				var paramInput = addArrayInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), 
					inputParents, index, objectPath, printName);
				bodyInputContainer.appendChild(paramInput);
			}else if(swaggerObject.type == "object"){
				returnedType = "object";
				var paramInput = addObjectInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), 
					inputParents, index, objectPath, printName);
				bodyInputContainer.appendChild(paramInput);
			}else{
				//This object has no type, check if it contains a "properties" with ojects or arrays
				if(swaggerObject.properties != undefined){
					var keys = Object.keys(swaggerObject.properties);
					for(var i=0; i<keys.length; i++){
						var swagProp = swaggerObject.properties[keys[i]];
						//add name from property key
						swagProp.name = keys[i];
						var paramEle = parseinputObject(swagProp, inputParents, index, objectPath, true);
						bodyInputContainer.appendChild(paramEle);
					}
				}else{//No owen properties tag, then it's an input field
					returnedType = "input";
					var paramInput = addStringOrIntegerInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"),  
						inputParents, index, printName);
					bodyInputContainer.appendChild(paramInput);
				}
				
			}

			

			
			return bodyInputContainer;
		}


		function addArrayInput(swaggerObject, targetPramName, inputParents, index, objectPath, printName){

			var arrayItems = [];
			if(typeof swaggerObject.items == "object"){
				arrayItems.push(swaggerObject.items);
			}else{
				arrayItems = swaggerObject.items;
			}


			var nameAndInput = document.createElement("div");
			nameAndInput.className = "swaggerAreaForInput";
			if(index%2 == 0){
				nameAndInput.className += " swaggerBack1";
			}else{
				nameAndInput.className += " swaggerBack2";
			}

			var hasANameTag = false;
			var name = document.createElement("span");
			name.className = "swaggerTitle";
			name.innerHTML = "<span style='color:gray;'>"+objectPath+".</span>"+swaggerObject.name;
			if(swaggerObject.name != undefined && printName){//Print name is false for the first container since it's name is already printed on the left side
				hasANameTag = true;
				nameAndInput.appendChild(name);
			}
			if(swaggerObject.name != undefined){
				objectPath += "."+swaggerObject.name;
			}
			

			var param = {
				name:  swaggerObject.name,
				type: "array",
				index: 0,
				next: [], 
			};
			inputParents.next.push(param);


			var arrayDescription = document.createElement("div");
			arrayDescription.className = "inputDescription";
			arrayDescription.innerHTML = swaggerHand.swagAccess(swaggerObject, "items").description;
			nameAndInput.appendChild(arrayDescription);


			for(var i=0; i<arrayItems.length; i++){
				var arr = swaggerHand.swagAccess(arrayItems, i);
				nameAndInput.appendChild(parseinputObject(arr,  param, i, objectPath, true));
			}




			if(hasANameTag){
				nameAndInput.style.marginLeft = "32px";
			}
			
			

			return nameAndInput;
		}


		function addObjectInput(swaggerObject, targetPramName, inputParents, index, objectPath, printName){
			var nameAndInput = document.createElement("div");
				nameAndInput.className = "swaggerAreaForInput";
				if(index%2 == 0){
					nameAndInput.className += " swaggerBack1";
				}else{
					nameAndInput.className += " swaggerBack2";
				}

			var hasANameTag = false;
			var name = document.createElement("span");
			name.className = "swaggerTitle";
			name.innerHTML = "<span style='color:gray;'>"+objectPath+".</span>"+swaggerObject.name;
			if(swaggerObject.name != undefined && printName){//Print name is false for the first container since it's name is already printed on the left side
				hasANameTag = true;
				nameAndInput.appendChild(name);
			}
			if(swaggerObject.name != undefined){
				objectPath += "."+swaggerObject.name;
			}


			if(!printName){//If we are at the root container we removethe left side border
				nameAndInput.style.border = "none";
			}

			if(swaggerObject.items != undefined){
				if(swaggerObject.items.description != undefined){
					var arrayDescription = document.createElement("div");
					arrayDescription.className = "inputDescription";
					arrayDescription.innerHTML = swaggerObject.items.description;
					nameAndInput.appendChild(arrayDescription);
				}
			}
			
			

			var param = {
				name:  swaggerObject.name,
				type: "object",
				next: [], 
			};
			inputParents.next.push(param);

			var objectProperties  = Object.keys(swaggerHand.swagAccess(swaggerObject, "properties"));



			for(var i=0; i<objectProperties.length; i++){
				var prop = swaggerHand.swagAccess(swaggerObject, "properties")[objectProperties[i]];
				prop.name = objectProperties[i];
				prop = swaggerHand.parseSwaggerObject(swaggerJSON, prop);
				nameAndInput.appendChild(parseinputObject(prop, param, i, objectPath, true));
			}




			if(hasANameTag){
				nameAndInput.style.marginLeft = "32px";
			}
			
			
			

			return nameAndInput;
		}


		function addStringOrIntegerInput(swaggerObject, targetPramName, inputParents, index, printName){
			var nameAndInput = document.createElement("div");
				nameAndInput.className = "swaggerAreaForInput";
				if(index%2 == 0){
					nameAndInput.className += " swaggerBack1";
				}else{
					nameAndInput.className += " swaggerBack2";
				}

			var name = document.createElement("span");
			name.className = "swaggerMediumText";
			name.innerHTML = targetPramName;
			if(targetPramName != undefined  && printName){
				nameAndInput.appendChild(name);
			}

			if(!printName){//If we are at the root container we removethe left side border
				nameAndInput.style.border = "none";
			}

			var paramInput = createInputField(
					swaggerObject.type, 
					swaggerObject.description,
			);


			var param = {
				name:  swaggerObject.name,
				type: "value",
				inputType: swaggerObject.type,
				next: [], 
				inputField: paramInput.input,
			};
			inputParents.next.push(param);


			if(swaggerObject.enum != undefined){
				var enumCon = document.createElement("span");
				enumCon.className = "swaggerEnum";
				enumCon.innerHTML = "</br>ENUM: ";
				for(var x=0; x<swaggerObject.enum.length; x++){
					enumCon.innerHTML += ", "+swaggerObject.enum[x];
				}
				name.appendChild(enumCon);
			}

			nameAndInput.appendChild(paramInput.inputContainer);






			return nameAndInput;
		}


		function createInputField(type, description){
			inputFieldCounter++;
			var paramInputContainer = document.createElement("div");
			paramInputContainer.className = "parListRight";

			var paramInput = document.createElement("input");
			//paramInput.value =
			paramInput.placeholder =  "("+type+")";
			paramInput.className = "swaggerInput";

			var inputDescription = document.createElement("span");
			inputDescription.innerHTML = description;
			inputDescription.className = "inputDescription";

			paramInputContainer.appendChild(paramInput);
			if(description != undefined){
				paramInputContainer.appendChild(inputDescription);
			}
			

			return {
				inputContainer: paramInputContainer,
				input: paramInput,
			};
		}





	}return{
		init: initModule
	}


});