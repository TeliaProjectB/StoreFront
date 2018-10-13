define(["retrieveApi", "makeRepetitions"], function(retrieveApi, makeRepetitions){
	function initModule(apiBoxSize){
		var reapeatAPI = new makeRepetitions.init();

		var rowDatas = [];

		this.addRowData = function(rowData){
			rowDatas.push(rowData);
		}


		this.rowMoveLeft = function(rowData){
			goBackToRoot(rowData);

			removeTransition(rowData);
			addListenersOnApi(reapeatAPI.addRepetitionLeftSide(rowData), rowData);
			rowScrollPositionUpdate(rowData);


			


			setTimeout(function(){
				restoreTransition(rowData);
				rowData.index--;
				rowScrollPositionUpdate(rowData);

				var maxVisibleApi = Math.round(rowData.apiContainer.clientWidth / apiBoxSize);
				var neededApiOnRight = maxVisibleApi - rowData.numberOfRepeatingApi;
				
				//Remove repeatings on right side if there are any
				if(rowData.repeatingsRight > neededApiOnRight && rowData.repeatingsRight > 0){
					rowData.apiMoveWrapper.removeChild(rowData.apiMoveWrapper.lastChild);
					rowData.repeatingsRight--;
				}

			}, 75);

		}



		this.rowMoveRight = function(rowData){
			goBackToRoot(rowData);

			addListenersOnApi(reapeatAPI.addRepetitionRightSide(rowData), rowData);


			if(rowData.repeatingsLeft + rowData.index  > 1 && 
				rowData.repeatingsLeft > 0){
				removeTransition(rowData);
				removeGeneratedApiOnLeft(rowData);
				rowScrollPositionUpdate(rowData);
			}
				
			setTimeout(function(){
				rowData.index++;
				restoreTransition(rowData);
				rowScrollPositionUpdate(rowData);
			}, 75);
			
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


		function restoreTransition(rowData){
			rowData.apiMoveWrapper.style.WebkitTransition = "margin 0.12s ease-out";
			rowData.apiMoveWrapper.style.MozTransition = "margin 0.12s ease-out";
			rowData.apiMoveWrapper.style.transition = "margin 0.12s ease-out";
		}

		function goBackToRoot(rowData){

			//takes the index ofrotation (-1 is clicked left onece, 1 is clicked right once)
			var mod = rowData.numberOfRepeatingApi;
			var numb = Math.abs(rowData.index);

			//if the index modulo the original repeating api is 0 then the user has madeacomplete rotation to start.
			if(numb % mod == 0){
				//remove css transition, move api index to start position and update scrol position.
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