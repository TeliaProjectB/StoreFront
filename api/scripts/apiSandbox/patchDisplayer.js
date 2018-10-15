define([], function(){
	"use strict";
	
	function initModule(){
		var basePath = "";

		var windowElement = document.getElementById("swaggerPatchInfo");
		var parameterContainer = document.createElement("div");
		windowElement.appendChild(parameterContainer);

		var executebutton = document.createElement("button");
		executebutton.innerHTML = "Execute query";
		executebutton.className = "swaggerExecuteButton";
		windowElement.appendChild(executebutton);


		var responsesSwitchButton = document.createElement("button");
		responsesSwitchButton.innerHTML = "Responses";
		responsesSwitchButton.onclick = switchResponseWindow;
		responsesSwitchButton.className = "swaggerToggleResponses";
		windowElement.appendChild(responsesSwitchButton);

		var responsesContainer = document.createElement("div");
		windowElement.appendChild(responsesContainer);

		this.display = function(patchData, name, consumes, produces){
			cleanWindow();

			addTitle(patchData, name);
			addProduceConsume(consumes, produces);
			addParameters(patchData);

			addResponses(patchData);
		}


		this.setBasePath = function(baseUrlPath){
			if(baseUrlPath[0] == "/"){
				baseUrlPath = "ServerRoot"+baseUrlPath;
			}
			basePath = baseUrlPath;
		}

		function addProduceConsume(consumes, produces){
			var subtitle = document.createElement("div");
			subtitle.className = "swaggerSubtitle";
			subtitle.innerHTML = "Consumes: "+consumes+".     Produces: "+produces;
			parameterContainer.appendChild(subtitle);
		}

		function addResponses(patchData){

			var listOfResponses = document.createElement("ul");
			listOfResponses.className = "swaggerLister";
			var listHead = document.createElement("li");
			listHead.className = "parListRow";

			var name = document.createElement("span");
			name.innerHTML = "Code";
			name.className = "parListLeft parListName swaggerMediumText";
			listHead.appendChild(name);

			var description = document.createElement("span");
			description.innerHTML = "Description";
			description.className = "parListRight parListName swaggerMediumText";
			listHead.appendChild(description);
			listOfResponses.appendChild(listHead);



			var responsesKeys = Object.keys(patchData.responses);
			for(var i=0; i<responsesKeys.length; i++){
				var responseCode = document.createElement("div");

				var row = document.createElement("li");
				row.className = "parListRow";

				var code = document.createElement("div");
				code.innerHTML = responsesKeys[i];
				code.className = "parListLeft parListName swaggerMediumText"
				row.appendChild(code);

				var description = document.createElement("div");
				description.innerHTML = patchData.responses[responsesKeys[i]].description;
				description.className = "parListRight parListName swaggerMediumText"
				row.appendChild(description);


				listOfResponses.appendChild(row);
			}


			responsesContainer.appendChild(listOfResponses);
		}

		function addTitle(patchData, name){
			var title = document.createElement("h1");
			title.innerHTML = name;
			parameterContainer.appendChild(title);
		}
		
		function addParameters(patchData){
			var paramCon = document.createElement("div");
			var paramTitle = document.createElement("h2");
			paramTitle.innerHTML = "Parameters";
			paramCon.appendChild(paramTitle);

			var listOfPrams = document.createElement("ul");
			listOfPrams.className = "swaggerLister";
			var listHead = document.createElement("li");
			listHead.className = "parListRow";

			var name = document.createElement("span");
			name.innerHTML = "Name";
			name.className = "parListLeft parListName swaggerMediumText";
			listHead.appendChild(name);

			var description = document.createElement("span");
			description.innerHTML = "Description";
			description.className = "parListRight parListName swaggerMediumText";
			listHead.appendChild(description);
			listOfPrams.appendChild(listHead);


			for(var i=0; i<patchData.parameters.length; i++){
				var row = document.createElement("li");
				row.className = "parListRow";

				var leftPartContainer = document.createElement("div");
				leftPartContainer.className = "parListLeft"
				var paramName = document.createElement("div");

				if(patchData.parameters[i].required){
					var asterix = document.createElement("div");
					asterix.innerHTML = "*";
					asterix.className = "swaggerAsterix";
					paramName.appendChild(asterix);
				}

				paramName.className = "parListName swaggerMediumText"
				paramName.innerHTML += patchData.parameters[i].name;
				leftPartContainer.appendChild(paramName);

				if(patchData.parameters[i].type != undefined){
					var paramType = document.createElement("div");
					paramType.className = "parListType"
					paramType.innerHTML = patchData.parameters[i].type;
					leftPartContainer.appendChild(paramType);
				}
				

				if(patchData.parameters[i].in != undefined){
					var paramIn = document.createElement("div");
					paramIn.className = "parListIn"
					paramIn.innerHTML = "("+patchData.parameters[i].in+")";
					leftPartContainer.appendChild(paramIn);
				}
				

				row.appendChild(leftPartContainer);

				var paramDesc = document.createElement("div");
				paramDesc.className = "parListRight swaggerMediumText"
				paramDesc.innerHTML = patchData.parameters[i].description;
				var paramInput = document.createElement("input");
				paramInput.className = "swaggerInput";
				paramDesc.appendChild(paramInput);
				row.appendChild(paramDesc);

				listOfPrams.appendChild(row);
			}


			parameterContainer.appendChild(listOfPrams);


			console.log(patchData);
		}

		function cleanWindow(){
			while(parameterContainer.firstChild){
				parameterContainer.removeChild(parameterContainer.firstChild);
			}

			while(responsesContainer.firstChild){
				responsesContainer.removeChild(responsesContainer.firstChild);
			}
		}


		function switchResponseWindow(){
			if(responsesContainer.style.display == "none"){
				responsesContainer.style.display = "inline";
			}else{
				responsesContainer.style.display = "none";
			}
		}

	}return{
		init: initModule
	}


});