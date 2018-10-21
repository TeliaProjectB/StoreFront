define(["scripts/apiSandbox/swaggerHandler", "scripts/apiSandbox/sendTestRequest",
	"scripts/apiSandbox/propertiesInputGen"], 
	function(swaggerHandler, sendTestRequest, propertiesInputGen){
	"use strict";
	
	function initModule(swaggerJSON, paramValuesManager){
		

		var swaggerHand = new swaggerHandler.init(swaggerJSON);
		var propertiesinput = new propertiesInputGen.init(swaggerHand, swaggerJSON, paramValuesManager);
		
		var basePath = "";

		var windowElement = document.getElementById("swaggerPatchInfo");
		var parameterContainer = document.createElement("div");
		windowElement.appendChild(parameterContainer);

		
		var resultsWindow = document.createElement("div");
		resultsWindow.id = "swaggerResultsWindow";

		var requestTester = new sendTestRequest.init(swaggerJSON, resultsWindow, paramValuesManager);
		

		var responsesContainer = document.createElement("div");
		windowElement.appendChild(responsesContainer);

		var executebutton = document.createElement("button");

		var exampleValues

		var currentPathData;
		var currentPatchName;
		var requestMethod;

		this.display = function(patchData, name, consumes, produces, requestType){
			consumes = (consumes == undefined) ? consumes = "" : consumes=consumes;
			produces = (produces == undefined) ? produces = "" : produces=produces;
			requestType = (requestType == undefined) ? requestType = "" : requestType=requestType;

			requestTester.setConsumesProduces(consumes, produces);

			currentPathData = patchData;
			currentPatchName = name;
			requestMethod = requestType;
			cleanWindow();

			addTitle(patchData, name);
			addProduceConsume(consumes, produces);
			addParameters(patchData);


			executebutton.innerHTML = "Execute query";
			executebutton.className = "buttonSwagger strongButton";
			parameterContainer.appendChild(executebutton);

			parameterContainer.appendChild(resultsWindow);


			addResponses(patchData);
		}


		this.setBasePath = function(baseUrlPath){

			if(baseUrlPath[0] == "/"){
				if(swaggerJSON.host == undefined){
					baseUrlPath = "Unknown"+baseUrlPath;
				}else{
					baseUrlPath = swaggerJSON.host+baseUrlPath;
				}
				
			}
			basePath = baseUrlPath;
		}




		executebutton.onclick = function(){
			requestTester.send(currentPathData, basePath+currentPatchName, requestMethod, function(response){
				//console.log(response);
			});
		};


		function addExampleData(patchData){
			exampleValues = document.createElement("div");

			//exampleValues.
			var pathTag = patchData.tags[0];

			//get all property keys of definitions
			var definitionKeys = Object.keys(swaggerJSON.definitions);
			for(var i=0; i<definitionKeys.length; i++){
				if(swaggerJSON.definitions[definitionKeys[i]].title == pathTag){

				}
			}

			
			parameterContainer.appendChild(exampleValues);
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
				if(i%2==0){
					row.className += " swaggerBack1";
				}else{
					row.className += " swaggerBack2";
				}

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
				var swaggerObject = swaggerHand.parseSwaggerObject(swaggerJSON, patchData.parameters[i]);
				

				var row = document.createElement("li");
				row.className = "parListRow";
				if(i%2==0){
					row.className += " swaggerBack1";
				}else{
					row.className += " swaggerBack2";
				}

				var leftPartContainer = document.createElement("div");
				leftPartContainer.className = "parListLeft"
				var paramName = document.createElement("div");

				if(swaggerObject.required){
					var asterix = document.createElement("div");
					asterix.innerHTML = "*";
					asterix.className = "swaggerAsterix";
					paramName.appendChild(asterix);
				}

				paramName.className = "parListName swaggerMediumText"
				paramName.innerHTML += swaggerObject.name;
				leftPartContainer.appendChild(paramName);


				if(swaggerObject.type != undefined){
					var paramType = document.createElement("div");
					paramType.className = "parListType"
					paramType.innerHTML = swaggerObject.type;
					leftPartContainer.appendChild(paramType);
				}

				if(swaggerObject.in != undefined){
					var paramIn = document.createElement("div");
					paramIn.className = "swaggerSubtitle"
					paramIn.innerHTML = "("+swaggerObject.in+")";
					leftPartContainer.appendChild(paramIn);
				}
				

				

				row.appendChild(leftPartContainer);
				
				
				row.appendChild(propertiesinput.parseInput(swaggerObject, i));
				listOfPrams.appendChild(row);
			}


			parameterContainer.appendChild(listOfPrams);


		}
		

		function cleanWindow(){
			while(parameterContainer.firstChild){
				parameterContainer.removeChild(parameterContainer.firstChild);
			}

			while(responsesContainer.firstChild){
				responsesContainer.removeChild(responsesContainer.firstChild);
			}
		}


		




	}return{
		init: initModule
	}


});