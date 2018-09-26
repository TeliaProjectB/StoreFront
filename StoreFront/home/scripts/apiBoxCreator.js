define([], function(){
	function initModule(){


		this.createApiBox = function(apiContainer, apiData){
			apiContainer.setAttribute("mouseover", false);

			var newApi = document.createElement("div");
			newApi.className = "apiBox";

			/*var apiBackground = document.createElement("div");
			apiBackground.className = "apiBackground";
			apiBackground.style.backgroundImage = "url("+apiData.image+")";
			newApi.appendChild(apiBackground);*/

			var apiTitle = document.createElement("div");
			apiTitle.className = "apiTitle";
			apiTitle.innerHTML = apiData.name;

			var apiDescription = document.createElement("div");
			apiDescription.className = "apiDescription";
			apiDescription.innerHTML = apiData.description;

			var titleDescContainer = document.createElement("div");
			titleDescContainer.className = "titleDescContainer";
			titleDescContainer.style.backgroundImage = "url("+apiData.image+")";

			titleDescContainer.appendChild(apiTitle);
			titleDescContainer.appendChild(apiDescription);

			newApi.appendChild(titleDescContainer);
			apiContainer.appendChild(newApi);
			

			newApi.setAttribute("myApiId", apiData.id);
			

		}


	}return{
		init: initModule
	}
});