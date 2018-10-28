define(["scripts/apiSandbox/inputGeneratingFuncs",
	"scripts/apiSandbox/createInputPanel"], function(inputGeneratingFuncs, createInputPanel){
	"use strict";
	
	function initModule(swaggerHand, swaggerJSON, paramValuesManager){
		var inputManagerFuncs = new inputGeneratingFuncs.init(swaggerJSON, swaggerHand);
		var inputPanelCreator = new createInputPanel.init();
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
				if(paramInput !== null){
					bodyInputContainer.appendChild(paramInput);
				}
			}else if(swaggerObject.type == "object"){
				returnedType = "object";
				var paramInput = addObjectInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), 
					inputParents, index, objectPath, printName);
				if(paramInput !== null){
					bodyInputContainer.appendChild(paramInput);
				}
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
					if(paramInput !== null){
						bodyInputContainer.appendChild(paramInput);
					}
				}
				
			}

			

			
			return bodyInputContainer;
		}


		function addArrayInput(swaggerObject, targetPramName, inputParents, index, objectPath, printName){
			var arrayItems = [];
			if(typeof swaggerObject.items == "object"){
				arrayItems.push(swaggerObject.items);
			}else{
				inputManagerFuncs.sortArrayItems(swaggerObject);
				arrayItems = swaggerObject.items;
			}

			var inputArea = createInputArea(swaggerObject, objectPath, index, printName);
			var nameAndInput = inputArea.element;
			objectPath = inputArea.path;






			var param = {
				name:  swaggerObject.name,
				type: "array",
				index: 0,
				next: [], 
			};
			inputParents.next.push(param);


			if(inputManagerFuncs.noInfiniteLoopInReferences(objectPath)){
				for(var i=0; i<arrayItems.length; i++){
					var arr = swaggerHand.swagAccess(arrayItems, i);
					if(arr.required == undefined){
						arr.required = inputManagerFuncs.ifInputCheckIfRequired(swaggerObject, i);;
					}
					var inputObject = parseinputObject(arr,  param, i, objectPath, true);
					
					nameAndInput.appendChild(inputObject);
				}
			}else{
				return null
			}
			




			if(inputArea.hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				inputArea.nameElement.insertBefore(inputPanelCreator.getPanelTogglebutton(), inputArea.nameElement.firstChild);
				inputPanelCreator.createPanel(nameAndInput, inputArea.nameElement);
			}
			
			

			return nameAndInput;
		}


		function addObjectInput(swaggerObject, targetPramName, inputParents, index, objectPath, printName){
			var inputArea = createInputArea(swaggerObject, objectPath, index, printName);
			var nameAndInput = inputArea.element;
			objectPath = inputArea.path;
			
			

			var param = {
				name:  swaggerObject.name,
				type: "object",
				next: [], 
			};
			inputParents.next.push(param);

			var objectProperties  = Object.keys(swaggerHand.swagAccess(swaggerObject, "properties"));

			inputManagerFuncs.sortObjectProperties(swaggerObject, objectProperties);
			if(inputManagerFuncs.noInfiniteLoopInReferences(objectPath)){
				for(var i=0; i<objectProperties.length; i++){
					var prop = swaggerHand.swagAccess(swaggerObject, "properties")[objectProperties[i]];
					prop.name = objectProperties[i];
					prop = swaggerHand.parseSwaggerObject(swaggerJSON, prop);

					
					if(prop.required == undefined){
						prop.required = inputManagerFuncs.ifInputCheckIfRequired(swaggerObject, objectProperties[i]);
					}
					var inputObject = parseinputObject(prop, param, i, objectPath, true);
					nameAndInput.appendChild(inputObject);
				}
			}else{
				return null;
			}
			




			if(inputArea.hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				inputArea.nameElement.insertBefore(inputPanelCreator.getPanelTogglebutton(), inputArea.nameElement.firstChild);
				inputPanelCreator.createPanel(nameAndInput, inputArea.nameElement);
			}			
			
			

			return nameAndInput;
		}


		function addStringOrIntegerInput(swaggerObject, targetPramName, inputParents, index, printName, required){
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

			var paramInput;


			//If swaggerObject.enum is not defined, a select tag is created, otherwise an input field is created
			paramInput = createInputField(
				swaggerObject.type, 
				swaggerObject.description,
				swaggerObject.enum
			);

			if(swaggerObject.required || required){
				paramInput.input.style.border = "solid 1px #a10008";
				paramInput.input.setAttribute("required", "true");
			}else{
				paramInput.input.setAttribute("required", "false");
			}

			var param = {
				name:  swaggerObject.name,
				type: "value",
				inputType: swaggerObject.type,
				next: [], 
				inputField: paramInput.input,
			};
			inputParents.next.push(param);


			

			nameAndInput.appendChild(paramInput.inputContainer);


			return nameAndInput;
		}



		function createInputArea(swaggerObject, objectPath, index, printName){
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

			var arrayDescription = inputManagerFuncs.getDescription(swaggerObject);
			nameAndInput.appendChild(arrayDescription);

			return {
				element: nameAndInput,
				path: objectPath,
				hasANameTag: hasANameTag,
				nameElement: name,
			};
		}



		function createInputField(type, description, dropDownMenuItems){
			inputFieldCounter++;
			var paramInputContainer = document.createElement("div");
			paramInputContainer.className = "parListRight";

			var paramInput;
			if(dropDownMenuItems === undefined || dropDownMenuItems.length === 0){
				paramInput = document.createElement("input");
				paramInput.placeholder =  "("+type+")";
			}else{
				paramInput = document.createElement("select");
				for(var i=0; i<dropDownMenuItems.length; i++){
					var option = document.createElement("option");
					option.innerHTML = dropDownMenuItems[i];
					option.value = dropDownMenuItems[i];
					paramInput.appendChild(option);
				}
			}
			
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