define([], function(){
	"use strict";
	
	function initModule(){

		var windowElement = document.getElementById("swaggerPatchInfo");


		this.display = function(patchData, name){
			cleanWindow();

			addTitle(patchData, name);
			addParameters(patchData);
		}



		function addTitle(patchData, name){
			var title = document.createElement("h1");
			title.innerHTML = name;
			windowElement.appendChild(title);
		}
		
		function addParameters(patchData){
			var paramCon = document.createElement("div");
			var paramTitle = document.createElement("h2");
			paramTitle.innerHTML = "Parameters";
			paramCon.appendChild(paramTitle);

			var listOfPrams = document.createElement("ul");
			var listHead = document.createElement("li");
			listHead.className = "parListRow";

			var name = document.createElement("span");
			name.innerHTML = "Name";
			name.className = "parListLeft";
			listHead.appendChild(name);

			var description = document.createElement("span");
			description.innerHTML = "description";
			description.className = "parListRight";
			listHead.appendChild(description);
			listOfPrams.appendChild(listHead);


			for(var i=0; i<patchData.parameters.length; i++){
				var row = document.createElement("li");
				row.className = "parListRow";

				var paramName = document.createElement("div");
				paramName.className = "parListLeft"
				paramName.innerHTML = patchData.parameters[i].name;
				row.appendChild(paramName);

				var paramDesc = document.createElement("div");
				paramDesc.className = "parListLeft"
				paramDesc.innerHTML = patchData.parameters[i].description;
				row.appendChild(paramDesc);

				listOfPrams.appendChild(row);
			}


			windowElement.appendChild(listOfPrams);
			console.log(patchData);
		}

		function cleanWindow(){
			while(windowElement.firstChild){
				windowElement.removeChild(windowElement.firstChild);
			}
		}

	}return{
		init: initModule
	}


});