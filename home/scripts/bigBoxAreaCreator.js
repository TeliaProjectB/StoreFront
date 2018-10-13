define(["retrieveApi"], function(retrieveApi){
	function initModule(apiRetriever){



		this.appendBoxArea = function(element, onComplete){

			/*
			Create the container for simpleboxes
			*/
			element.className += " rowContainer";
			var titleEle = document.createElement("a");
			titleEle.href = "/StoreFront/category?cat="+element.getAttribute("name");
			titleEle.className= "rowTitle";
			titleEle.style.position = "relative";
			titleEle.innerHTML= element.getAttribute("name");
			element.appendChild(titleEle);

			/*Load api element for simple boxcontainer, the elements for the api are generated in 
			"loadApiBoxes" and appended automatically
			*/
			apiRetriever.loadApisBoxes(element, element.getAttribute("name"), function(apiBoxContainer){
				onComplete();
			});
			


		}


	}return{
		init: initModule
	}
});