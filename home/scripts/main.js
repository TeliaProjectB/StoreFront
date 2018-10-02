requirejs(["rowCreator", "bigBoxAreaCreator",
	"retrieveApi"], function(rowCreator, bigBoxAreaCreator,
		retrieveApi) {
	var apiRetriever = new retrieveApi.init();

	var createRows = new rowCreator.init(apiRetriever);
	var boxesArea = new bigBoxAreaCreator.init(apiRetriever);
	var allContentRows = document.getElementsByClassName("contentRow");

	for(var i=0; i<allContentRows.length; i++){
		createRows.appendRow(allContentRows[i]);
	}

	var bogBoxAreas = document.getElementsByClassName("bigBoxesCategories");

	for(var i=0; i<bogBoxAreas.length; i++){
		boxesArea.appendBoxArea(bogBoxAreas[i]);
	}

});