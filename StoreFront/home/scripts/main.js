requirejs(["rowCreator"], function(rowCreator) {
	var createRows = new rowCreator.init();
	var allContentRows = document.getElementsByClassName("contentRow");

	for(var i=0; i<allContentRows.length; i++){
		createRows.appendRow(allContentRows[i]);
	}
});