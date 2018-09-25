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
					name: element.getAttribute("name"),
					element: element,
					apiContainer: apiElementContainer,
					apiMoveWrapper:  apiMoveWrapper,
					index: 0,
					numberOfRepeatingApi: numberOfElements,
					originalRepeatingAPI: originalRepeatingAPI,
					repeatingsRight: 0,
					repeatingsLeft: 0,
					oldApiClientWidth: 0
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
				

				rowData.oldApiClientWidth = rowData.apiContainer.clientWidth;
				resizeRow(rowData);

				autoFillOnStart(rowData);

			});

			
		}


		function autoFillOnStart(rowData){
			var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
			var neededApi = maxVisibleApi - rowData.apiMoveWrapper.children.length - rowData.repeatingsLeft;

			for(var i=0; i<neededApi+1; i++){
				addOnHoverApiListener(reapeatAPI.addRepetitionRightSide(rowData), rowData);
			}


			removeTransition(rowData);
			addOnHoverApiListener(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			updateScrollPosition(rowData);
			//restoreTransition(rowData);
		}


		function addOnHoverApiListener(apiElement, rowData){
			apiElement.addEventListener("mouseenter", function(){
				restoreTransition(rowData);
				rowData.apiMoveWrapper.setAttribute("mouseover", true);
				updateScrollPosition(rowData);
			});

			apiElement.addEventListener("mouseleave", function(){
				restoreTransition(rowData);
				rowData.apiMoveWrapper.setAttribute("mouseover", false);
				updateScrollPosition(rowData);
			});
		}




		function rowMoveLeft(rowData){
			goBackToRoot(rowData);

			removeTransition(rowData);
			addOnHoverApiListener(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			updateScrollPosition(rowData);


			


			setTimeout(function(){
				restoreTransition(rowData);
				rowData.index--;
				updateScrollPosition(rowData);

				var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
				var neededApiOnRight = maxVisibleApi - rowData.numberOfRepeatingApi;
				
				//Remove repeatings on right side if there are any
				if(rowData.repeatingsRight > neededApiOnRight && rowData.repeatingsRight > 0){
					rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.lastChild);
					rowData.repeatingsRight--;
				}

			}, 75);

		}



		function rowMoveRight(rowData){
			goBackToRoot(rowData);

			addOnHoverApiListener(reapeatAPI.addRepetitionRightSide(rowData), rowData);


			if(rowData.repeatingsLeft + rowData.index  > 1 && 
				rowData.repeatingsLeft > 0){
				removeTransition(rowData);
				removeGeneratedApiOnLeft(rowData);
				updateScrollPosition(rowData);
			}
				
			setTimeout(function(){
				rowData.index++;
				restoreTransition(rowData);
				updateScrollPosition(rowData);
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

			leftMargin -= rowData.repeatingsLeft*apiBoxSize;

			rowData.apiMoveWrapper.style.marginLeft = leftMargin+"px";
		}


		function resizeRow(rowData){

			var widthDifference = rowData.apiContainer.clientWidth - rowData.oldApiClientWidth;


			var apiDifference = widthDifference/apiBoxSize;
			if(apiDifference > 0){
				apiDifference = Math.round(apiDifference);
			}else {
				apiDifference = Math.round(apiDifference);
			}

			if(apiDifference != 0){
				rowData.oldApiClientWidth = rowData.apiContainer.clientWidth;
			}
			
			if(apiDifference  > 0){
				for(var i=0; i<apiDifference; i++){
					addOnHoverApiListener(reapeatAPI.addRepetitionRightSide(rowData), rowData);
				}
			}else{
				for(var i=0; i<apiDifference/-1; i++){
					if(rowData.apiMoveWrapper.children.length > 1){
						rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.lastChild);
						rowData.repeatingsRight--;
					}
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

		function goBackToRoot(rowData){
			var mod = rowData.numberOfRepeatingApi;
			var numb = Math.abs(rowData.index);

			if(numb % mod == 0){
				removeTransition(rowData);
				rowData.index = 0;
				autoFillOnStart(rowData);
				updateScrollPosition(rowData);
			}

		}

		
		function removeGeneratedApiOnLeft(rowData){
			//Remove repeatings on right side if there are any
			if(rowData.repeatingsLeft > 0){
				rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.firstChild);
				rowData.repeatingsLeft--;
			}
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
