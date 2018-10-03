define(["retrieveApi"], function(retrieveApi){
	function initModule(apiRetriever){



		this.appendBoxArea = function(element){
			element.className += " rowContainer";
			var titleEle = document.createElement("a");
			titleEle.href = "/StoreFront/search?cat="+element.getAttribute("name");
			titleEle.className= "rowTitle";
			titleEle.style.position = "relative";
			titleEle.innerHTML= element.getAttribute("name");

			element.appendChild(titleEle);

			apiRetriever.loadApisBoxes(element, element.getAttribute("name"), function(apiBoxContainer){

			});


			/*var findMoreButton = document.createElement("a");
			findMoreButton.innerHTML = "More";
			findMoreButton.className = "findMoreButton";
			findMoreButton.href = "/StoreFront/search?cat="+element.getAttribute("name");

			var container = document.createElement("div");
			container.style.width = "100%";
			container.style.textAlign = "center";
			container.appendChild(findMoreButton);


			element.appendChild(container);*/

			


		}


	}return{
		init: initModule
	}
});