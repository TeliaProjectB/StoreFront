define(["retrieveApi"], function(retrieveApi){
	function initModule(){
		var apiRetriever = new retrieveApi.init();
		var apiBoxSize;

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



			apiRetriever.loadApis(apiElementContainer, element.getAttribute("name"), function(numberOfElements, apiMoveWrapper){
				apiBoxSize = apiMoveWrapper.firstChild.clientWidth+16;
				
				var rowData = {
					element: element,
					apiContainer: apiElementContainer,
					apiMoveWrapper:  apiMoveWrapper,
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

			updateScrollPosition(rowData);
		}

		function rowMoveRight(rowData){
			if(rowData.index < rowData.length){
				rowData.index++;
			}

			updateScrollPosition(rowData);
		}


		function updateScrollPosition(rowData){
			rowData.apiMoveWrapper.style.marginLeft = (-rowData.index)*apiBoxSize+"px";
		}


	}return{
		init: initModule
	}
});