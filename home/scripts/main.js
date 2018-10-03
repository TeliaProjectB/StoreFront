requirejs(["rowCreator", "bigBoxAreaCreator",
	"retrieveApi"], function(rowCreator, bigBoxAreaCreator,
		retrieveApi) {
	var apiRetriever = new retrieveApi.init();

	var createRows = new rowCreator.init(apiRetriever);
	var boxesArea = new bigBoxAreaCreator.init(apiRetriever);
	var allContentRows = document.getElementsByClassName("contentRow");
	var bogBoxAreas = document.getElementsByClassName("bigBoxesCategories");

	var loadingStartElement =document.getElementById("onStartloading");

	var completionCounter = 0;
	function completed(){
		completionCounter++;
		if(completionCounter >= allContentRows.length + bogBoxAreas.length){
			loadingStartElement.parentElement.removeChild(loadingStartElement);
		}
	}


	for(var i=0; i<allContentRows.length; i++){
		createRows.appendRow(allContentRows[i], completed);
	}

	

	for(var i=0; i<bogBoxAreas.length; i++){
		boxesArea.appendBoxArea(bogBoxAreas[i], completed);
	}

});