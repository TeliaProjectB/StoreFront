define([], function(){
	function initModule(){


		this.createApiBox = function(apiContainer, apiData){
			/*
			Generate the api box element from "apiData"
			"apiData" contains: Name, imgName,Description, Priceand RandomId
			*/
			apiContainer.setAttribute("mouseover", false);

			var newApi = document.createElement("div");
			newApi.className = "apiBox";


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


			var price = document.createElement("div");
			price.className = "apiPriceRow";
			price.innerHTML = "Price: "+apiData.Price+" kr";
			newApi.appendChild(price);

			apiContainer.appendChild(newApi);
			
			//stores the random id as an element attribute that will be accessed when clicking on the element
			newApi.setAttribute("myApiId", apiData.RandomId);
			

		}


		this.createSimpleBox = function(apiContainer, apiData){
			/*
			Generate the api box element from "apiData"
			"apiData" contains: Name, imgName,Description, Priceand RandomId
			*/
			
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
				newApi.className += " panelActive";
			});

		}


	}return{
		init: initModule
	}
});
