define(["retrieveApi", "makeRepetitions"], function(retrieveApi, makeRepetitions){
	function initModule(apiBoxSize){
		var reapeatAPI = new makeRepetitions.init();

		var rowDatas = [];	

		var rowIsAnimating = false;

		this.addRowData = function(rowData){
			rowDatas.push(rowData);
		}


		this.rowMoveLeft = function(rowData){
			if(rowIsAnimating){
				return;
			}
			goBackToRoot(rowData, "left");

			removeTransition(rowData);
			addListenersOnApi(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			rowScrollPositionUpdate(rowData);


			removeGeneratedApiOnRight(rowData);

			rowIsAnimating = true;
			setTimeout(function(){
				restoreTransition(rowData, 1);
				rowData.index--;
				rowScrollPositionUpdate(rowData);

				var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
				var neededApiOnRight = maxVisibleApi - rowData.numberOfRepeatingApi;
				
				//Remove repeatings on right side if there are any
				if(rowData.repeatingsRight > neededApiOnRight && rowData.repeatingsRight > 0){
					rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.lastChild);
					rowData.repeatingsRight--;
				}
				setTimeout(function(){
					rowIsAnimating = false;
				}, 300);
			}, 1);

		}



		this.rowMoveRight = function(rowData){
			if(rowIsAnimating){
				return;
			}

			goBackToRoot(rowData, "right");

			addListenersOnApi(reapeatAPI.addRepetitionRightSide(rowData), rowData);


			if(rowData.repeatingsLeft + rowData.index  > 1 && 
				rowData.repeatingsLeft > 0){
				removeTransition(rowData);
				removeGeneratedApiOnLeft(rowData);
				rowScrollPositionUpdate(rowData);
			}
			
			rowIsAnimating = true;
			setTimeout(function(){
				rowData.index++;
				restoreTransition(rowData, 1);
				rowScrollPositionUpdate(rowData);
				setTimeout(function(){
					rowIsAnimating = false;
				}, 300);
			}, 1);
			
		}


		function updateScrollPosition(rowData){
			rowScrollPositionUpdate(rowData);
		}


		function rowScrollPositionUpdate(rowData){
			var leftMargin = (-rowData.index)*apiBoxSize;
			/*if(rowData.index > 0){
				leftMargin -= (howMuchIsOutside(rowData))*apiBoxSize;
			}*/
			if(rowData.apiMoveWrapper.getAttribute("mouseover") === "true"){
				leftMargin -= 23;
			}

			leftMargin -= rowData.repeatingsLeft*apiBoxSize;

			rowData.apiMoveWrapper.style.marginLeft = leftMargin+"px";
		}



		this.externalResizeRow = function(rowData){
			resizeRow(rowData);
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
					addListenersOnApi(reapeatAPI.addRepetitionRightSide(rowData), rowData);
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


		function restoreTransition(rowData, transitionSpeed){
			if(transitionSpeed == undefined){
				transitionSpeed = 0.25;
			}
			transitionSpeed = 0.3;
			rowData.apiMoveWrapper.style.WebkitTransition = "margin "+transitionSpeed+"s ease-out";
			rowData.apiMoveWrapper.style.MozTransition = "margin "+transitionSpeed+"s ease-out";
			rowData.apiMoveWrapper.style.transition = "margin "+transitionSpeed+"s ease-out";
		}

		function goBackToRoot(rowData, sourceAction){

			//takes the index ofrotation (-1 is clicked left onece, 1 is clicked right once)
			var mod = rowData.numberOfRepeatingApi;
			var numb = Math.abs(rowData.index);

			//if the index modulo the original repeating api is 0 then the user has madeacomplete rotation to start.
			if(numb % mod == 0){
				console.log("Go back to root");
				//remove css transition, move api index to start position and update scrol position.
				removeTransition(rowData);
				rowData.index = 0;
				autoFillOnStart(rowData);
				updateScrollPosition(rowData);


				if(rowData.numberOfRepeatingApi > 0){
					var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
					var excessiveApiOnRight = rowData.apiMoveWrapper.children.length - maxVisibleApi;
					while(excessiveApiOnRight > 0 && rowData.repeatingsRight > 0){
						removeGeneratedApiOnRight(rowData);
						excessiveApiOnRight--;
					}
				}

				if(sourceAction == "left"){
					//remove all repeatings on left since we are at the root
					while(rowData.repeatingsLeft > 0){
						removeGeneratedApiOnLeft(rowData);
					}
				}
				
				
			}
		}



		function removeGeneratedApiOnLeft(rowData){
			//Remove repeatings on right side if there are any
			if(rowData.repeatingsLeft > 0){
				rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.firstChild);
				rowData.repeatingsLeft--;
			}
		}


		function removeGeneratedApiOnRight(rowData){
			//Remove repeatings on right side if there are any
			if(rowData.repeatingsRight > 0){
				rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.lastChild);
				rowData.repeatingsRight--;
			}
		}


		function autoFillOnStart(rowData){
			var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
			var neededApi = maxVisibleApi - rowData.apiMoveWrapper.children.length - rowData.repeatingsLeft;

			for(var i=0; i<neededApi+1; i++){
				addListenersOnApi(reapeatAPI.addRepetitionRightSide(rowData), rowData);
			}


			removeTransition(rowData);
			addListenersOnApi(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			updateScrollPosition(rowData);

		}


		this.externalAutoFillOnStart = function(rowData){
			autoFillOnStart(rowData);
		}


		this.externalAddListenerOnApi = function(apiElement, rowData){
			addListenersOnApi(apiElement, rowData);
		}

		function addListenersOnApi(apiElement, rowData){
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

			apiElement.addEventListener("mousedown", function(){
				apiElement.className += " panelActive";
			});
			apiElement.onclick = function(){
				document.body.style.cursor = "wait";
				setTimeout(function(){
					window.open("/StoreFront/api/?id="+apiElement.getAttribute("myApiId"), "_self");
				}, 60);
			};
		}



		var oldWindowResize = window.onresize;

		window.onresize = function(){
			if(oldWindowResize != undefined){
				oldWindowResize();
			}

			for(var i=0; i<rowDatas.length; i++){
				resizeRow(rowDatas[i]);
				rowScrollPositionUpdate(rowDatas[i]);
			}
			
		};


	}return{
		init: initModule
	}
});