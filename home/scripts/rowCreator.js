define(["retrieveApi", "makeRepetitions"], function(retrieveApi, makeRepetitions){
	function initModule(){
		var reapeatAPI = new makeRepetitions.init();
		var apiRetriever = new retrieveApi.init();
		var apiBoxSize;

		var rowDatas = [];

		this.appendRow = function(element){
			element.className += " rowContainer";

			var titleEle = document.createElement("h1");
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
				
				var originalRepeatingAPI = [];
				for(var i=0; i<apiMoveWrapper.children.length; i++){
					originalRepeatingAPI.push(apiMoveWrapper.children[i]);
				}

				var rowData = {
					element: element,
					apiContainer: apiElementContainer,
					apiMoveWrapper:  apiMoveWrapper,
					index: 0,
					length: numberOfElements,
					originalRepeatingAPI: originalRepeatingAPI,
					repeatingsRight: 0,
					repeatingLeft: 0,
				};
				

				rowDatas.push(rowData);


				leftButton.onclick = function(){
					rowMoveLeft(rowData);
				};

				rightButton.onclick = function(){
					rowMoveRight(rowData);
				};


				var apiChildren = rowData.apiMoveWrapper.children;

				for(var i=0; i<apiChildren.length; i++){
					addOnHoverApiListener(apiChildren[i], rowData);
				}
				


				resizeRow(rowData);
			});

			
		}


		function addOnHoverApiListener(apiElement, rowData){
			apiElement.addEventListener("mouseenter", function(){
				rowData.apiMoveWrapper.setAttribute("mouseover", true);
				updateScrollPosition(rowData);
			});

			apiElement.addEventListener("mouseleave", function(){
				rowData.apiMoveWrapper.setAttribute("mouseover", false);
				updateScrollPosition(rowData);
			});
		}


		function rowMoveLeft(rowData){
			removeTransition(rowData);
			addOnHoverApiListener(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			updateScrollPosition(rowData);

			setTimeout(function(){
				restoreTransition(rowData);
				rowData.index--;
				updateScrollPosition(rowData);

				purgeGeneratedElements(rowData);
			}, 75);

		}

		function rowMoveRight(rowData){
			var maxMargin = rowData.apiContainer.clientWidth;


			var spaceOnRight = (rowData.length*apiBoxSize) + (-rowData.index)*apiBoxSize;

			rowData.index++;


			addOnHoverApiListener(reapeatAPI.addRepetitionRightSide(rowData), rowData);


			setTimeout(function(){
				updateScrollPosition(rowData);
				purgeGeneratedElements(rowData);
			}, 75);
			
		}


		function updateScrollPosition(rowData){
			var leftMargin = (-rowData.index)*apiBoxSize;
			/*if(rowData.index > 0){
				leftMargin -= (howMuchIsOutside(rowData))*apiBoxSize;
			}*/
			if(rowData.apiMoveWrapper.getAttribute("mouseover") === "true"){
				leftMargin -= 17;
			}

			leftMargin -= rowData.repeatingLeft*apiBoxSize;

			rowData.apiMoveWrapper.style.marginLeft = leftMargin+"px";
		}


		function resizeRow(rowData){
			var maxMargin = rowData.apiContainer.clientWidth;
			var spaceOnRight = (rowData.length*apiBoxSize) + (-rowData.index)*apiBoxSize;

			var neededApi = spaceOnRight / apiBoxSize;

			if(neededApi > 0){
				for(var i=0; i<neededApi+1; i++){
					addOnHoverApiListener(reapeatAPI.addRepetitionRightSide(rowData), rowData);
				}
			}

		}


		function removeTransition(rowData){
			rowData.apiMoveWrapper.style.WebkitTransition = "all 0s ease";
			rowData.apiMoveWrapper.style.MozTransition = "all 0s ease";
			rowData.apiMoveWrapper.style.transition = "all 0s ease";
		}


		function restoreTransition(rowData){
			rowData.apiMoveWrapper.style.WebkitTransition = "margin 0.15s ease-out";
			rowData.apiMoveWrapper.style.MozTransition = "margin 0.15s ease-out";
			rowData.apiMoveWrapper.style.transition = "margin 0.15s ease-out";
		}

		function fixRepetition(){

		}

		
		function purgeGeneratedElements(rowData){
			var maxMargin = rowData.apiContainer.clientWidth;
			var maViewableApi = Math.round(maxMargin/apiBoxSize);

			

		}

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