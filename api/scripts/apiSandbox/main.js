"use strict";
require(["scripts/apiSandbox/getSwagger", "scripts/apiSandbox/pathsFilesystem",
	"scripts/apiSandbox/updateApiInfoPanel"], 
	function(getSwagger, pathsFilesystem, updateApiInfoPanel){
"use strict";

var infoPanelUpdater = new updateApiInfoPanel.init();
var swaggerRetriever = new getSwagger.init();
var fileSystem;








//Load swagger file from current api id
swaggerRetriever.getSwagger(getParameterByName("id"), function(swaggerJSON){
	/*If Swagger file is false, then this api doesnt have a swagger file. Remove the whole sandbox button and stop this script*/
	if(swaggerJSON === false){
		var sandboxButton = document.getElementById("sandboxButton");
		sandboxButton.parentElement.removeChild(sandboxButton);
		return;
	}

	infoPanelUpdater.update(swaggerJSON);
	
	//Create manager of swagger data
	fileSystem = new pathsFilesystem.init(swaggerJSON);

	//loop through each property in paths
	var path = Object.keys(swaggerJSON.paths);
	for(var i=0; i<path.length; i++){
		//Adds path name and it's data as an item in the file explorer
		fileSystem.addPath(path[i], swaggerJSON.paths[path[i]], swaggerJSON.consumes, swaggerJSON.produces);
	}

	fileSystem.setBasePath(swaggerJSON.basePath);
	//Inserts data from swagger into the file manager
	fileSystem.insertDataToSystem();


});





function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return results[2].replace(/\+/g, " ");
}





});