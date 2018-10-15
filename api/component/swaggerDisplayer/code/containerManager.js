define([], function(){
	"use strict";
	
	function initModule(){
		var mainContainer = document.getElementById("swaggerDisplay");
		mainContainer.className = "swaggerInfoCon";


		this.addPath = function(pathName, pathInfo){
			console.log(pathInfo);
			var pathCon = document.createElement("div");
			pathCon.className = "swaggerPathCon";

			var pathTop = document.createElement("div");

			var swaggerPathName = document.createElement("div");
			swaggerPathName.innerHTML = pathName;
			swaggerPathName.className = "swaggerPathName";
			pathTop.appendChild(swaggerPathName);

			pathCon.appendChild(pathTop);



			if(pathInfo.post != undefined){
				addPathType(pathCon, pathInfo.post, "&nbsp;POST");
			}

			if(pathInfo.get != undefined){
				addPathType(pathCon, pathInfo.get, "&nbsp;GET");
			}
			
			



			mainContainer.appendChild(pathCon);
		}
		

		function addPathType(pathCon, data, type){
			var container = document.createElement("div");
			var swaggerType = document.createElement("div");
			swaggerType.innerHTML = type;
			swaggerType.className = "swaggerPathType";
			container.appendChild(swaggerType);


			var swaggerDescription = document.createElement("div");
			swaggerDescription.className = "swaggerDescription";
			swaggerDescription.innerHTML = (data.description == undefined) ? data.summary : data.description;
			container.appendChild(swaggerDescription);


			if(data.consumes != undefined){
				addConsumes(container, data);
			}
			
			if(data.produces != undefined){
				addProduces(container, data);
			}
			

			var parametersTitle = document.createElement("div");
			parametersTitle.innerHTML = "Parameters";
			container.appendChild(parametersTitle);
			//Parameters
			for(var i=0; i<data.parameters.length; i++){
				var paramCon = document.createElement("div");
				var paramName = document.createElement("div");
				paramName.innerHTML = data.parameters[i].name;
				paramCon.appendChild(paramName);

				var paramDescription = document.createElement("div");
				paramDescription.innerHTML = data.parameters[i].description;
				paramCon.appendChild(paramDescription);



				console.log(data.parameters[i]);
			}

			pathCon.appendChild(container);
		}

		function addProduces(container, data){
			var swaggerProduces = document.createElement("div");
			swaggerProduces.className = "swaggerDescription";
			swaggerProduces.innerHTML = "Produces: ";
			for(var i=0; i<data.produces.length; i++){
				swaggerProduces.innerHTML += data.produces[i]+"  ";
			}
			container.appendChild(swaggerProduces);
		}

		function addConsumes(container, data){
			var swaggerConsumes = document.createElement("div");
			swaggerConsumes.className = "swaggerDescription";
			swaggerConsumes.innerHTML = "Consumes: ";
			for(var i=0; i<data.consumes.length; i++){
				swaggerConsumes.innerHTML += data.consumes[i]+"  ";
			}
			container.appendChild(swaggerConsumes);
		}

	}return{
		init: initModule
	}


});