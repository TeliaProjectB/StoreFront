define(["retrieveApi"], function(retrieveApi){
	function initModule(){
		var apiRetriever = new retrieveApi.init();
		var apiBoxSize;

		var rowDatas = [];

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
				var style = getComputedStyle(apiMoveWrapper.firstChild);
				apiBoxSize = apiMoveWrapper.firstChild.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
				
				var rowData = {
					element: element,
					apiContainer: apiElementContainer,
					apiMoveWrapper:  apiMoveWrapper,
					index: 0,
					length: numberOfElements
				};
				

				rowDatas.push(rowData);


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
			var maxMargin = rowData.apiContainer.clientWidth;


			var spaceOnRight = (rowData.length*apiBoxSize) + (-rowData.index)*apiBoxSize;

			if(spaceOnRight > maxMargin){
				rowData.index++;
			}

			updateScrollPosition(rowData);
		}


		function updateScrollPosition(rowData){
			var leftMargin = (-rowData.index)*apiBoxSize;
			/*if(rowData.index > 0){
				leftMargin -= (howMuchIsOutside(rowData))*apiBoxSize;
			}*/
			rowData.apiMoveWrapper.style.marginLeft = leftMargin+"px";
		}


		function resizeRow(rowData){
			var maxMargin = rowData.apiContainer.clientWidth;
			var spaceOnRight = (rowData.length*apiBoxSize) + (-rowData.index)*apiBoxSize;

			if(spaceOnRight < maxMargin){
				while(spaceOnRight < maxMargin){
					rowData.index--;
					spaceOnRight = (rowData.length*apiBoxSize) + (-rowData.index)*apiBoxSize;
				}
				rowData.index++;
			}
			

		}


		/*function howMuchIsOutside(rowData){
			var containerWidth = rowData.apiContainer.clientWidth;

			var percentageOutside = containerWidth/apiBoxSize;

			percentageOutside = percentageOutside - Math.floor(percentageOutside);

			return percentageOutside;

		}*/

		var oldWindowResize = window.onresize;

		window.onresize = function(){
			if(oldWindowResize != undefined){
				oldWindowResize();
			}

			for(var i=0; i<rowDatas.length; i++){
				resizeRow(rowDatas[i]);
				updateScrollPosition(rowDatas[i]);
			}
			
		};


	}return{
		init: initModule
	}
});