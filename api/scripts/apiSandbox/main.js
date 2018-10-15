"use strict";
require(["scripts/apiSandbox/getSwagger", "scripts/apiSandbox/containerManager", "scripts/apiSandbox/pathsFilesystem"], 
	function(getSwagger, containerManager, pathsFilesystem){
"use strict";

var manageContainer = new containerManager.init();
var swaggerRetriever = new getSwagger.init();
var fileSystem = new pathsFilesystem.init();







swaggerRetriever.getSwagger("randomID", function(swaggerJSON){
	console.log(swaggerJSON);
	var path = Object.keys(swaggerJSON.paths);
	for(var i=0; i<path.length; i++){
		//manageContainer.addPath(path[i], swaggerJSON.paths[path[i]]);
		fileSystem.addPath(path[i], swaggerJSON.paths[path[i]], swaggerJSON.consumes, swaggerJSON.produces);
	}

	fileSystem.setBasePath(swaggerJSON.basePath);

	fileSystem.insertDataToSystem();


});







});