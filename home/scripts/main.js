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
		//When all apis has been loaded, remove the loading element
		completionCounter++;
		if(completionCounter >= allContentRows.length + bogBoxAreas.length){
			loadingStartElement.parentElement.removeChild(loadingStartElement);
		}
	}

	//create rows for all elements with the class "contentRow"
	for(var i=0; i<allContentRows.length; i++){
		createRows.appendRow(allContentRows[i], completed);
	}

	

	//create box areas for all elements with the class "bigBoxesCategories"
	for(var i=0; i<bogBoxAreas.length; i++){
		boxesArea.appendBoxArea(bogBoxAreas[i], completed);
	}

});