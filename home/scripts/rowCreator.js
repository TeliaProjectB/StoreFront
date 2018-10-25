define(["makeRepetitions", "animateRow"], function(makeRepetitions, animateRow){
	function initModule(apiRetriever){
		var rowAnimator;
		var reapeatAPI = new makeRepetitions.init();
		var apiBoxSize;


		this.appendRow = function(element, onComplete){
			element.className += " rowContainer";

			var titleEle = document.createElement("a");
			titleEle.href = "/StoreFront/category?cat="+element.getAttribute("name");
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



			apiRetriever.loadApisRows(apiElementContainer, element.getAttribute("name"), function(numberOfElements, apiMoveWrapper){
				if(apiMoveWrapper.firstChild === null){
					return;
				}
				var style = getComputedStyle(apiMoveWrapper.firstChild);
				apiBoxSize = apiMoveWrapper.firstChild.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
				rowAnimator = new animateRow.init(apiBoxSize);

				var originalRepeatingAPI = [];
				for(var i=0; i<apiMoveWrapper.children.length; i++){
					originalRepeatingAPI.push(apiMoveWrapper.children[i]);
				}

				var rowData = {
					name: element.getAttribute("name"),
					element: element,
					apiContainer: apiElementContainer,
					apiMoveWrapper:  apiMoveWrapper,
					index: 0,
					numberOfRepeatingApi: numberOfElements,
					originalRepeatingAPI: originalRepeatingAPI,
					repeatingsRight: 0,
					repeatingsLeft: 0,
					oldApiClientWidth: 0,
				};
				

				rowAnimator.addRowData(rowData);

				var clickLeftbutton = function(){
					var maxVisibleApi = Math.floor(rowData.apiContainer.clientWidth / apiBoxSize);
					var jumpSize = maxVisibleApi;
					if(jumpSize > rowData.numberOfRepeatingApi){
						jumpSize -= jumpSize-rowData.numberOfRepeatingApi;
					}
					rowAnimator.rowMoveLeft(rowData, jumpSize);
				};

				leftButton.addEventListener("touchstart", function(){
					clickLeftbutton();
				});

				leftButton.onclick = function(){
					clickLeftbutton();
				};



				var clickRightButton = function(){
					var maxVisibleApi = Math.floor(rowData.apiContainer.clientWidth / apiBoxSize);
					var jumpSize = maxVisibleApi;
					if(jumpSize > rowData.numberOfRepeatingApi){
						jumpSize -= jumpSize-rowData.numberOfRepeatingApi;
					}
					rowAnimator.rowMoveRight(rowData, jumpSize);
				};

				rightButton.addEventListener("touchstart", function(){
					clickRightButton();
				});

				rightButton.onclick = function(){
					clickRightButton();
				};


				var apiChildren = rowData.apiMoveWrapper.children;

				for(var i=0; i<apiChildren.length; i++){
					rowAnimator.externalAddListenerOnApi(apiChildren[i], rowData);
				}
				

				rowData.oldApiClientWidth = rowData.apiContainer.clientWidth;
				rowAnimator.externalResizeRow(rowData);

				rowAnimator.externalAutoFillOnStart(rowData);

				onComplete();
			});

			
		}







		



	}return{
		init: initModule
	}
});
