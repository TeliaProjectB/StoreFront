define(["scripts/apiSandbox/inputGeneratingFuncs",
	"scripts/apiSandbox/createInputPanel"], function(inputGeneratingFuncs, createInputPanel){
	"use strict";
	
	function initModule(swaggerHand, swaggerJSON, paramValuesManager){
		/*
		This module recursivly loops through parameters in the swagger file and creates input elements for them.
		*/
		var inputManagerFuncs = new inputGeneratingFuncs.init(swaggerJSON, swaggerHand);
		var inputPanelCreator = new createInputPanel.init();





		this.parseInput = function(swaggerObject, index){
			/*
			Start parsing of a swager path parameter.
			*/
			var paramInType = swaggerHand.swagAccess(swaggerObject, "in");
			var name = swaggerHand.swagAccess(swaggerObject, "name");
			var rootPathType = swaggerHand.swagAccess(swaggerObject, "type");

			//Create a new parameter path and add it to our list of swagger parameters
			var newParamPath = {
				next: [],
				in: paramInType,
				name: name,
				type: rootPathType,
				//type: "root",
			};
			paramValuesManager.addRootParam(newParamPath);

			//Parse input
			return parseinputObject(swaggerObject, newParamPath, index, "", false);
		}
		

		function parseinputObject(swaggerObject, inputParents, index, objectPath, printName){
			//Parses inut object that can be either an array, object, or a direct input
			//This function recursively loops through either "addArrayInput", "addObjectInput" or "addStringOrIntegerInput".

			//The element we're gonna put all the input elements of this parameter inside.
			var bodyInputContainer = document.createElement("div");
			var returnedType = "";
			


			if(swaggerObject.type == "array"){
				/*
				if the parameteris an array, create an array input element and append it onto the container.
				*/

				returnedType = "array";
				var paramInput = addArrayInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), 
					inputParents, index, objectPath, printName);
				if(paramInput !== null){
					bodyInputContainer.appendChild(paramInput);
				}



			}else if(swaggerObject.type == "object"){
				/*
				if the parameteris an object, create an object input element and append it onto the container.
				*/

				returnedType = "object";
				var paramInput = addObjectInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"), 
					inputParents, index, objectPath, printName);
				if(paramInput !== null){
					bodyInputContainer.appendChild(paramInput);
				}



			}else{


				//This object has no type, we  can't be sure if it should be treated as an array or an 
				//object. check if it has the peroperty "properties",
				if(swaggerObject.properties != undefined){
					var keys = Object.keys(swaggerObject.properties);
					for(var i=0; i<keys.length; i++){
						var swagProp = swaggerObject.properties[keys[i]];
						//add name from property key
						swagProp.name = keys[i];
						var paramEle = parseinputObject(swagProp, inputParents, index, objectPath, true);
						bodyInputContainer.appendChild(paramEle);
					}
				}else{//No own properties tag, then it's an input field
					returnedType = "input";
					var paramInput = addStringOrIntegerInput(swaggerObject, swaggerHand.swagAccess(swaggerObject, "name"),  
						inputParents, index, printName, objectPath);
					if(paramInput !== null){
						bodyInputContainer.appendChild(paramInput);
					}
				}

				
			}

			

			
			return bodyInputContainer;
		}


		function addArrayInput(swaggerObject, targetPramName, inputParents, index, objectPath, printName){
			/*
			If swagger array only has one item then "swaggerObject.items" might be treated as an object
			instead of an index.
			*/
			var arrayItems = [];
			if(typeof swaggerObject.items == "object"){
				//If items is treated as a single object push it into array items array,
				arrayItems.push(swaggerObject.items);
			}else{
				//otherwise sort array items and put them into arrayItems
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
				objectPath: objectPath,
			};
			//Add this parameter as next for the root parameter path 
			inputParents.next.push(param);


			//Some faulty swagger files may have infinite loops in their references 
			//so we must check if there is a loop to prevent it
			if(inputManagerFuncs.noInfiniteLoopInReferences(objectPath)){
				//Loop thgourh each array item
				for(var i=0; i<arrayItems.length; i++){
					//Get array with its references included
					var arritem = swaggerHand.swagAccess(arrayItems, i);

					if(arritem.required == undefined){
						//check array if it's input is required
						arritem.required = inputManagerFuncs.ifInputCheckIfRequired(swaggerObject, i);
					}
					//Parse array item, it may be an object, another array or just an input field
					//This returns an element container of it
					var inputObject = parseinputObject(arritem,  param, i, objectPath, true);
					
					//Append input object to this parameter's container
					nameAndInput.appendChild(inputObject);
				}
			}else{
				//if there is an infinite loop return nothing and this parameter will not be added to the container
				return null;
			}
			



			//If input area has a name tag, which tells us that it's an input container, for an object or array
			//Add a margin to the left to make it look better
			if(inputArea.hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				//Add panel button as the first child
				inputArea.nameElement.insertBefore(inputPanelCreator.getPanelTogglebutton(), inputArea.nameElement.firstChild);
				//Create a panel of thie container(you can maximize or minimize it)
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
				objectPath: objectPath,
			};
			//Add this parameter as next for the root parameter path 
			inputParents.next.push(param);


			//Get all object's properties, swagAccess includes stuff from $ref
			var objectProperties  = Object.keys(swaggerHand.swagAccess(swaggerObject, "properties"));

			//sort properties based of parameter depth
			inputManagerFuncs.sortObjectProperties(swaggerObject, objectProperties);

			//Some faulty swagger files may have infinite loops in their references 
			//so we must check if there is a loop to prevent it
			if(inputManagerFuncs.noInfiniteLoopInReferences(objectPath)){
				//Loopthrough each parameterobject property
				for(var i=0; i<objectProperties.length; i++){
					var proptyItem = swaggerHand.swagAccess(swaggerObject, "properties")[objectProperties[i]];
					//Add the name property from the kay value
					proptyItem.name = objectProperties[i];
					proptyItem = swaggerHand.parseSwaggerObject(swaggerJSON, proptyItem);

					
					if(proptyItem.required == undefined){
						//check array if it's input is required
						proptyItem.required = inputManagerFuncs.ifInputCheckIfRequired(swaggerObject, objectProperties[i]);
					}

					//Parse object parameter item, it may be an object, an array or just an input field
					//This returns an element container of it
					var inputObject = parseinputObject(proptyItem, param, i, objectPath, true);
					//Append input object to this parameter's container
					nameAndInput.appendChild(inputObject);
				}
			}else{
				//if there is an infinite loop return nothing and this parameter will not be added to the container
				return null;
			}
			



			//If input area has a name tag, which tells us that it's an input container, for an object or array
			//Add a margin to the left to make it look better
			if(inputArea.hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				//Add panel button as the first child
				inputArea.nameElement.insertBefore(inputPanelCreator.getPanelTogglebutton(), inputArea.nameElement.firstChild);
				//Create a panel of thie container(you can maximize or minimize it)
				inputPanelCreator.createPanel(nameAndInput, inputArea.nameElement);
			}			
			
			

			return nameAndInput;
		}


		function addStringOrIntegerInput(swaggerObject, targetPramName, inputParents, index, printName, objectPath){
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


			//if input is required add a red border
			if(swaggerObject.required){
				paramInput.input.style.border = "solid 1px #a10008";
				paramInput.input.setAttribute("required", "true");
			}else{
				paramInput.input.setAttribute("required", "false");
			}

			//Create parameter for input
			var param = {
				name:  swaggerObject.name,
				type: "value",
				inputType: swaggerObject.type,
				next: [], 
				inputField: paramInput.input,
				objectPath: objectPath,
			};
			//Addparameter as net on the list in the root parameter path
			inputParents.next.push(param);


			
			//Append parameter input element to container
			nameAndInput.appendChild(paramInput.inputContainer);

			//And return element container the input field
			return nameAndInput;
		}



		function createInputArea(swaggerObject, objectPath, index, printName){
			//Create element container for parameter(s)
			var nameAndInput = document.createElement("div");
			nameAndInput.className = "swaggerAreaForInput";
			//Swap with gray and white packground
			if(index%2 == 0){
				nameAndInput.className += " swaggerBack1";
			}else{
				nameAndInput.className += " swaggerBack2";
			}

			var hasANameTag = false;

			//Create name tag for parameter name
			//Add objectPath to know where which parameter it originates from
			var name = document.createElement("span");
			name.className = "swaggerTitle";
			name.innerHTML = "<span style='color:gray;'>"+objectPath+".</span>"+swaggerObject.name;
			
			//Print name is false for the first container since it's name is already printed on the left side
			//if swaggerObject.name isundefined then we don't append this name element

			if(swaggerObject.name != undefined && printName){
				hasANameTag = true;
				nameAndInput.appendChild(name);
			}

			//If name is not undefined add it's nam in the parameter path
			if(swaggerObject.name != undefined){
				objectPath += "."+swaggerObject.name;
			}

			if(!printName){
				//If we are at the root container we removethe left side border
				nameAndInput.style.border = "none";
			}


			//Append parameter description to container
			var arrayDescription = inputManagerFuncs.getDescription(swaggerObject);
			nameAndInput.appendChild(arrayDescription);


			/*
			return element of parameter container
			return path of current parameter
			return if this parameter has a name tag(if it's a container of more parameters)
			return name element(parent functions first check if hasANameTag is true before accessing nameElement)
			*/
			return {
				element: nameAndInput,
				path: objectPath,
				hasANameTag: hasANameTag,
				nameElement: name,
			};
		}



		function createInputField(type, description, enumArray){
			//Creates an input field or a drop down select input field
			//if enum is availible
			var paramInputContainer = document.createElement("div");
			paramInputContainer.className = "parListRight";

			var paramInput;
			//if no enums are availible, create a simple input filed
			if(enumArray === undefined || enumArray.length === 0){
				paramInput = document.createElement("input");
				paramInput.placeholder =  "("+type+")";
			}else{
				//Otherwise create a select element with all the enums as options
				paramInput = document.createElement("select");
				for(var i=0; i<enumArray.length; i++){
					var option = document.createElement("option");
					option.innerHTML = enumArray[i];
					option.value = enumArray[i];
					paramInput.appendChild(option);
				}
			}
			
			paramInput.className = "swaggerInput";

			//Add input escription from parameter
			var inputDescription = document.createElement("span");
			inputDescription.innerHTML = description;
			inputDescription.className = "inputDescription";

			paramInputContainer.appendChild(paramInput);
			if(description != undefined){
				paramInputContainer.appendChild(inputDescription);
			}
			

			//Return input container and the input element that contains the value
			return {
				inputContainer: paramInputContainer,
				input: paramInput,
			};
		}






		


	}return{
		init: initModule
	}


});