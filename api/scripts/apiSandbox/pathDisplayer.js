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

		this.display = function(pathData, name, consumes, produces, requestType){
			/*Called to display a parameter path.*/
			consumes = (consumes == undefined) ? consumes = "" : consumes=consumes;
			produces = (produces == undefined) ? produces = "" : produces=produces;
			requestType = (requestType == undefined) ? requestType = "" : requestType=requestType;

			requestTester.setConsumesProduces(consumes, produces);

			currentPathData = pathData;
			currentPatchName = name;
			requestMethod = requestType;

			cleanWindow();

			addTitle(pathData, name, requestMethod);
			addProduceConsume(consumes, produces);
			addMainDescription(pathData);


			addParameters(pathData);


			executebutton.innerHTML = "Execute query";
			executebutton.className = "buttonSwagger strongButton";
			parameterContainer.appendChild(executebutton);

			parameterContainer.appendChild(resultsWindow);


			addResponses(pathData);
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
		

		function addProduceConsume(consumes, produces){
			var subtitle = document.createElement("p");
			subtitle.className = "swaggerSubtitle";
			subtitle.innerHTML = "Consumes: "+consumes+".     Produces: "+produces;
			parameterContainer.appendChild(subtitle);
		}

		function addResponses(pathData){
			/*
			Loop through the paths example responses and create a table of it
			*/
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



			var responsesKeys = Object.keys(pathData.responses);
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
				description.innerHTML = pathData.responses[responsesKeys[i]].description;
				description.className = "parListRight parListName swaggerMediumText"
				row.appendChild(description);


				listOfResponses.appendChild(row);
			}


			responsesContainer.appendChild(listOfResponses);
		}

		function addTitle(pathData, name, requestMethod){
			
			var title = document.createElement("h1");
			title.style.wordBreak = "break-all";
			var methodTypeHTML = "";
			//Add a title of the path and add a colored GET, PATH, PATCH or DELETE
			if(requestMethod == "GET"){
				methodTypeHTML = "<span style='color: green;'>"+requestMethod+"</span>";
			}else if(requestMethod == "POST"){
				methodTypeHTML = "<span style='color: blue;'>"+requestMethod+"</span>";
			}else if(requestMethod == "DELETE"){
				methodTypeHTML = "<span style='color: red;'>"+requestMethod+"</span>";
			}else if(requestMethod == "PATCH"){
				methodTypeHTML = "<span style='color: purple;'>"+requestMethod+"</span>";
			}
			//Add path name
			title.innerHTML = methodTypeHTML+": "+name;
			parameterContainer.appendChild(title);
		}

		function addMainDescription(pathData){
			if(pathData.description != undefined){
				//add <br> instead of \n
				pathData.description = pathData.description.replace(/\n/g, "<br />");
				var mainDesc = document.createElement("span");
				mainDesc.style.width = "90%";
				mainDesc.innerHTML = "<h2>Function description:</h2><br>"+"<p>"+pathData.description+"</p>";
				parameterContainer.appendChild(mainDesc);
			}
		}
		
		function addParameters(pathData){
			var paramCon = document.createElement("div");
			var paramTitle = document.createElement("h2");
			paramTitle.innerHTML = "Parameters";
			paramCon.appendChild(paramTitle);

			var listOfPrams = document.createElement("ul");
			listOfPrams.className = "swaggerLister";
			var listHead = document.createElement("li");
			listHead.className = "parListRow";


			//Loop through the parameters of the path
			for(var i=0; i<pathData.parameters.length; i++){
				var swaggerObject = swaggerHand.parseSwaggerObject(swaggerJSON, pathData.parameters[i]);
				console.log(swaggerObject);
				
				//swap between white and gray background color
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

				//Add parameter asterix if it's required
				if(swaggerObject.required){
					var asterix = document.createElement("div");
					asterix.innerHTML = "*";
					asterix.className = "swaggerAsterix";
					paramName.appendChild(asterix);
				}

				paramName.className = "parListName swaggerMediumText"
				paramName.innerHTML += swaggerObject.name;
				leftPartContainer.appendChild(paramName);

				//Add swagger objects "type" text
				if(swaggerObject.type != undefined){
					var paramType = document.createElement("div");
					paramType.className = "parListType"
					paramType.innerHTML = swaggerObject.type;
					leftPartContainer.appendChild(paramType);
				}

				//Add swagger objects "in" text
				if(swaggerObject.in != undefined){
					var paramIn = document.createElement("div");
					paramIn.className = "swaggerSubtitle"
					paramIn.innerHTML = "("+swaggerObject.in+")";
					leftPartContainer.appendChild(paramIn);
				}
				

				

				row.appendChild(leftPartContainer);
				
				//get parameter input 
				var paramRightInput = propertiesinput.parseInput(swaggerObject, i);
				paramRightInput.style.display = "flex";
				paramRightInput.style.flex = "1";
				paramRightInput.style.flexDirection = "column";
				row.appendChild(paramRightInput);

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
