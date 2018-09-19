define(["retrieveApi"], function(retrieveApi){
	function initModule(){
		var apiRetriever = new retrieveApi.init();


		this.appendRow = function(element){
			element.className += " rowContainer";

			var titleEle = document.createElement("div");
			titleEle.className= "rowTitle";
			titleEle.innerHTML= element.getAttribute("name");

			var flexHorContainer= document.createElement("div");
			flexHorContainer.className = "rowFlexContainer";


			var leftButton = document.createElement("button");
			leftButton.className = "rowButton";
			leftButton.style.backgroundImage = "url('img/left-arrow.svg')";
			var rightButton = document.createElement("button");
			rightButton.className = "rowButton";
			rightButton.style.backgroundImage = "url('img/right-arrow.svg')";


			

			var apiElementContainer=document.createElement("div");
			apiElementContainer.className = "middleScrollingContainer";


			element.appendChild(titleEle);
			flexHorContainer.appendChild(leftButton);
			flexHorContainer.appendChild(apiElementContainer);
			flexHorContainer.appendChild(rightButton);

			element.appendChild(flexHorContainer);


			apiRetriever.loadApis(apiElementContainer, element.getAttribute("name"), function(numberOfElements){
				var rowData = {
					element: element,
					index: 0,
					length: numberOfElements
				};


				leftButton.onclick = function(){
					rowMoveLeft(rowData);
				};

				rightButton.onclick = function(){
					rowMoveRight(rowData);
				};
			});



			
		}




		function rowMoveLeft(rowData){
			if(rowData.index > 0){
				rowData.index--;
			}
		}

		function rowMoveRight(rowData){
			if(rowData.index < rowData.length){
				rowData.index--;
			}
		}




	}return{
		init: initModule
	}
});