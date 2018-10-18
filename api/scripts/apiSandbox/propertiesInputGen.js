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


			return parseinputObject(swaggerObject, newParamPath, index);
		}
		

		function parseinputObject(swaggerObject, inputParents, index){
			//console.log(swaggerObject);
			var bodyInputContainer = document.createElement("div");

			var paramInput;
			if(swaggerObject.type == "array"){
				paramInput = addArrayInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), inputParents, index);
			}else if(swaggerObject.type == "object"){
				paramInput = addObjectInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), inputParents, index);
			}else{
				paramInput = addStringOrIntegerInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"),  inputParents, index);
			}

			bodyInputContainer.appendChild(paramInput);

			
			return bodyInputContainer;
		}


		function addArrayInput(swaggerObject, targetPramName, inputParents, index){

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

			var name = document.createElement("span");
			name.className = "swaggerTitle";
			name.innerHTML = swaggerObject.name;
			nameAndInput.appendChild(name);

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
				var arr = swaggerHand.swagAccess(arrayItems, i);//arrayItems[i];
				//console.log(arr);
				var input = parseinputObject(arr,  param, i);
				nameAndInput.appendChild(input);
			}



			return nameAndInput;
		}


		function addObjectInput(swaggerObject, targetPramName, inputParents, index){
			var nameAndInput = document.createElement("div");
				nameAndInput.className = "swaggerAreaForInput";
				if(index%2 == 0){
					nameAndInput.className += " swaggerBack1";
				}else{
					nameAndInput.className += " swaggerBack3";
				}


			var name = document.createElement("span");
			name.className = "swaggerMediumText";
			name.className = "swaggerTitle";
			name.innerHTML = swaggerObject.name;
			if(swaggerObject.name != undefined){
				nameAndInput.appendChild(name);
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
				var input = parseinputObject(prop, param, i);
				nameAndInput.appendChild(input);
			}



			return nameAndInput;
		}

		function addStringOrIntegerInput(swaggerObject, targetPramName, inputParents, index){
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
			if(targetPramName != undefined){
				nameAndInput.appendChild(name);
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
			paramInput.value = "("+type+")";
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