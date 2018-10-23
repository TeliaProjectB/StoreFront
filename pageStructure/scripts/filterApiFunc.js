function filterApi(){
	var searchText = document.getElementById("searchInput").value;
	if(searchText.replace(/ /g, '') != ""){
		smartJsLink("/StoreFront/category/?cat="+searchText);
	}
}


var inputSearchElement = document.getElementById("searchInput");
inputSearchElement.addEventListener("keyup", function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
	    filterApi();
	}
});
