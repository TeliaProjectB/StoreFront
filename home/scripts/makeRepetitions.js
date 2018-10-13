define(["retrieveApi"], function(retrieveApi){
	function initModule(){


		this.addRepetitionRightSide = function(rowData){
			/*
			Each row as a property "repeatingsRight" that inicates how many newly created api has been added to the right side.
			Use this variable modulo the number of api that were loaded and you'll make a circulation of api
			*/
			if(rowData.repeatingsRight < 0){
				rowData.repeatingsRight = 0;
			}

			var cloneThisNode = rowData.repeatingsRight % rowData.originalRepeatingAPI.length;
			
			while(cloneThisNode > rowData.originalRepeatingAPI.length){
				if(rowData.repeatingsRight > 0){
					rowData.repeatingsRight--;
				}else{
					break;
				}
				cloneThisNode = rowData.repeatingsRight % rowData.originalRepeatingAPI.length;
			}


			var repeatingAPI = rowData.originalRepeatingAPI[cloneThisNode].cloneNode(true);
			rowData.apiMoveWrapper.appendChild(repeatingAPI);

			rowData.repeatingsRight++;
			
			return repeatingAPI;
		}


		this.addRepetitionLeftSide = function(rowData){
			if(rowData.repeatingsLeft < 0){
				rowData.repeatingsLeft = 0;
			}

			var cloneThisNode = rowData.originalRepeatingAPI.length-1-(rowData.repeatingsLeft % rowData.originalRepeatingAPI.length);

			while(cloneThisNode > rowData.originalRepeatingAPI.length){
				if(rowData.repeatingsLeft > 0){
					rowData.repeatingsLeft--;
				}else{
					break;
				}
				cloneThisNode = rowData.originalRepeatingAPI.length-1-(rowData.repeatingsLeft % rowData.originalRepeatingAPI.length);
			}
			
			var repeatingAPI = rowData.originalRepeatingAPI[cloneThisNode].cloneNode(true);
			rowData.apiMoveWrapper.insertBefore(repeatingAPI, rowData.apiMoveWrapper.firstChild);

			rowData.repeatingsLeft++;

			var targetApiId = rowData.originalRepeatingAPI[cloneThisNode].getAttribute("myApiId");
			repeatingAPI.setAttribute("myApiId", targetApiId);

			return repeatingAPI;
		}
		


	}return{
		init: initModule
	}
});