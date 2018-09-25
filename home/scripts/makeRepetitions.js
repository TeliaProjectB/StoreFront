define(["retrieveApi"], function(retrieveApi){
	function initModule(){


		this.addRepetitionRightSide = function(rowData){
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

			return repeatingAPI;
		}
		


	}return{
		init: initModule
	}
});