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
			apiTitle.innerHTML = apiData.Name;

			var apiIcon = document.createElement("div");
			apiIcon.className = "apiBackground";
			apiIcon.style.backgroundImage = "url(/StoreFront/globalImages/API/"+apiData.imgName+")";

			var apiDescription = document.createElement("div");
			apiDescription.className = "apiDescription";
			apiDescription.innerHTML = apiData.Description;

			var titleDescContainer = document.createElement("div");
			titleDescContainer.className = "titleDescContainer";

			titleDescContainer.appendChild(apiTitle);
			titleDescContainer.appendChild(apiIcon);
			titleDescContainer.appendChild(apiDescription);

			newApi.appendChild(titleDescContainer);
			apiContainer.appendChild(newApi);
			

			newApi.setAttribute("myApiId", apiData.RandomId);
			

		}


		this.createSimpleBox = function(apiContainer, apiData){

			var newApi = document.createElement("div");
			newApi.className = "simpleApiBox";


			var apiTitle = document.createElement("div");
			apiTitle.className = "apiTitle";
			apiTitle.innerHTML = apiData.Name;


			var apiIcon = document.createElement("div");
			apiIcon.className = "apiBackground";
			apiIcon.style.backgroundImage = "url(/StoreFront/globalImages/API/"+apiData.imgName+")";

			var apiDescription = document.createElement("div");
			apiDescription.className = "apiDescription";
			apiDescription.innerHTML = apiData.Description;

			var titleDescContainer = document.createElement("div");
			titleDescContainer.className = "titleDescContainer";

			titleDescContainer.appendChild(apiTitle);
			titleDescContainer.appendChild(apiIcon);
			titleDescContainer.appendChild(apiDescription);

			newApi.appendChild(titleDescContainer);
			apiContainer.appendChild(newApi);
			
			
			newApi.onclick = function(){
				window.open("/StoreFront/api?id="+apiData.RandomId, '_self');
			};

			newApi.addEventListener("mousedown", function(){
				apiElement.className += " panelActive";
			});

		}


	}return{
		init: initModule
	}
});