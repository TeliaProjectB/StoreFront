define(["retrieveApi"], function(retrieveApi){
	function initModule(){


		this.addRepetitionRightSide = function(rowData){
			var repeatingAPI = rowData.originalRepeatingAPI[rowData.repeatingsRight % rowData.originalRepeatingAPI.length].cloneNode(true);
			rowData.apiMoveWrapper.appendChild(repeatingAPI);

			rowData.repeatingsRight++;
			
			return repeatingAPI;
		}


		this.addRepetitionLeftSide = function(rowData){
			var repeatingAPI = rowData.originalRepeatingAPI[rowData.originalRepeatingAPI.length-1-(rowData.repeatingLeft % rowData.originalRepeatingAPI.length)].cloneNode(true);
			rowData.apiMoveWrapper.insertBefore(repeatingAPI, rowData.apiMoveWrapper.firstChild);

			rowData.repeatingLeft++;

			return repeatingAPI;
		}
		


	}return{
		init: initModule
	}
});