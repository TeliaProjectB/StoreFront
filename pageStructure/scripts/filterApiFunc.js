function filterApi(){
	var searchText = document.getElementById("searchInput").value;
	if(searchText.replace(/ /g, '') != ""){
		window.open("/StoreFront/category/?cat="+searchText, "_self");
	}
}


var inputSearchElement = document.getElementById("searchInput");
inputSearchElement.addEventListener("keyup", function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
	    filterApi();
	}
});