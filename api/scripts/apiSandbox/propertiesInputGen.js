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
				sortArrayItems(swaggerObject);
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


			var arrayDescription = getDescription(swaggerObject);
			nameAndInput.appendChild(arrayDescription);


			if(noInfiniteLoopInReferences(objectPath)){
				for(var i=0; i<arrayItems.length; i++){
					var arr = swaggerHand.swagAccess(arrayItems, i);
					if(arr.required == undefined){
						arr.required = ifInputCheckIfRequired(swaggerObject, i);;
					}
					var inputObject = parseinputObject(arr,  param, i, objectPath, true);
					
					nameAndInput.appendChild(inputObject);
				}
			}else{
				return null
			}
			




			if(hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				name.insertBefore(getPanelTogglebutton(), name.firstChild);
				hidePanel(nameAndInput, name);
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

			var arrayDescription = getDescription(swaggerObject);
			nameAndInput.appendChild(arrayDescription);
			
			

			var param = {
				name:  swaggerObject.name,
				type: "object",
				next: [], 
			};
			inputParents.next.push(param);

			var objectProperties  = Object.keys(swaggerHand.swagAccess(swaggerObject, "properties"));

			sortObjectProperties(swaggerObject, objectProperties);
			if(noInfiniteLoopInReferences(objectPath)){
				for(var i=0; i<objectProperties.length; i++){
					var prop = swaggerHand.swagAccess(swaggerObject, "properties")[objectProperties[i]];
					prop.name = objectProperties[i];
					prop = swaggerHand.parseSwaggerObject(swaggerJSON, prop);

					
					if(prop.required == undefined){
						prop.required = ifInputCheckIfRequired(swaggerObject, objectProperties[i]);
					}
					var inputObject = parseinputObject(prop, param, i, objectPath, true);
					nameAndInput.appendChild(inputObject);
				}
			}else{
				return null;
			}
			




			if(hasANameTag){
				nameAndInput.style.marginLeft = "32px";
				name.insertBefore(getPanelTogglebutton(), name.firstChild);
				hidePanel(nameAndInput, name);
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

			var paramInput = createInputField(
					swaggerObject.type, 
					swaggerObject.description,
			);
			if(swaggerObject.required || required){
				paramInput.input.style.border = "solid 1px red";
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


		function ifInputCheckIfRequired(swaggerObject, inputName){
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


		function noInfiniteLoopInReferences(pathName){
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
			

			console.log("false");
			return true;
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



		function hidePanel(panel, nameElem){
			hidePanelsContent(panel);
			panel.style.maxHeight = "32px";
			panel.setAttribute("minimized", "true");


			var panelsTitle = panel.getElementsByClassName("swaggerTitle")[0];
			var panelToggleButton = panelsTitle.getElementsByTagName("BUTTON")[0];

			panelToggleButton.addEventListener("mouseup", function(e){

				var updateButtonText = "";
				if(panel.getAttribute("minimized") == "true"){
					showPanelsContent(panel);
					panel.setAttribute("minimized", "false");
					panel.style.maxHeight = "";
					updateButtonText = "url('img/minus.svg')";

				}else if(panel.getAttribute("minimized") == "false"){
					panel.setAttribute("minimized", "true");
					panel.style.maxHeight = "32px";
					panel.style.overflowY = "hidden";
					updateButtonText = "url('img/plus.svg')";
					//Hide content thwn animation is done
					hidePanelsContent(panel);
				}


				var panelsTitle = panel.getElementsByClassName("swaggerTitle")[0];
				var panelToggleButton = panelsTitle.getElementsByTagName("button")[0];
				panelToggleButton.style.backgroundImage = updateButtonText;
			});

		}


		function hidePanelsContent(panel){
			var directChildren = panel.children;
			for(var i=0; i<directChildren.length; i++){
				if(directChildren[i].tagName == "DIV"){
					directChildren[i].style.opacity = "0";
				}
			}
		}

		function showPanelsContent(panel){
			var directChildren = panel.children;
			for(var i=0; i<directChildren.length; i++){
				if(directChildren[i].tagName == "DIV"){
					directChildren[i].style.opacity = "1";
				}
			}
		}


		function getPanelTogglebutton(){
			var button = document.createElement("button");
			button.className = "sandboxMinMaxButton";
			button.style.backgroundImage = "url('img/plus.svg')";
			return button;
		}


		function getDescription(swaggerObject){
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



		function sortObjectProperties(swaggerObject, objectProperties){
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


		function sortArrayItems(swaggerObject){
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