define(["scripts/apiSandbox/patchDisplayer", "scripts/apiSandbox/parameterManager"], 
	function(patchDisplayer, parameterManager){
	"use strict";
	
	function initModule(swaggerJSON){
		var paramValuesManager = new parameterManager.init();

		var patchWindow = new patchDisplayer.init(swaggerJSON, paramValuesManager);

		var fileSystemMinimizer = document.getElementById("swaggerMinimize");

		/*Creates a new file explorer from "prettyFiles"  from script "prettyFileSystem.min.js*/
		var parameters = {
			itemName: "File",
			disableInteraction: true,
			onlyUniqueNames: true,
			createItemButtonOn: true,
			canResize: false
		};


		var fileSystemVisible = true;
		var fileSystemElem = document.getElementById("fileSystem");
		fileSystemElem.style.marginTop = "48px";
		var fileSystem = new prettyFiles.init().getInit("fileSystem", parameters);
		var fileSystemSizeDiv = document.getElementById("fileSystem").childNodes[0];
		var originalWidth = window.getComputedStyle(fileSystemSizeDiv).width;

		/*An associative array to keep track of which path folders has been created.
		The key is the path base name*/
		var arrayOfRoots = [];

		/*The object the filesystem reads from the generate its structure
		When dataStructure is complete it's inserted with "insertDataToSystem" which 
		calls a function from the filesystem to create a structure from a javascript object*/
		var dataStructure = [];

		//public
		this.addPath = function(pathName, pathData, consumes, produces){
			addRootFolder(pathName, pathData, consumes, produces);
			

			addGetFunc(pathName, pathData);
			addPostFunc(pathName, pathData);
			addDeleteFunc(pathName, pathData);
			addPatchFunc(pathName, pathData);

			
		}

		this.setBasePath = function(basePath){
			patchWindow.setBasePath(basePath);
		}

		this.insertDataToSystem = function(){
			fileSystem.insertData(JSON.stringify(dataStructure));
		}



		fileSystemMinimizer.onclick = function(){
			
			fileSystemSizeDiv.style.transition = "width 0.24s ease-in";
			fileSystemSizeDiv.style.webkitTransition = "width 0.24s ease-in";

			
			fileSystemElem.style.transition = "opacity 0.24s ease-in";
			fileSystemElem.style.webkitTransition = "opacity 0.24s ease-in";

			if(fileSystemVisible){
				fileSystemSizeDiv.style.width = "0px";
				fileSystemElem.style.opacity = "0";
				fileSystemSizeDiv.style.minWidth = "0px";

				fileSystemVisible = false;
				fileSystemMinimizer.style.transform = "rotate(180deg)";
			}else{
				fileSystemElem.style.opacity = "1";
				fileSystemSizeDiv.style.width = originalWidth;
				fileSystemMinimizer.style.transform = "rotate(0deg)";
				
				fileSystemVisible = true;
			}
			
			
		};


		fileSystem.onClickFile = function(name, id, image, customData){
			paramValuesManager.flushParameterList();
			var rootName = getRootName(name);
			
			patchWindow.display(arrayOfRoots[rootName].itemsData[customData.requestType+name], 
				name, 
				arrayOfRoots[rootName].consumes, 
				arrayOfRoots[rootName].produces,
				customData.requestType);
		};

		function addRootFolder(pathName, pathData, consumes, produces){
			//Parses the name and creates a root folder of the base name if there is none
			var rootName = getRootName(pathName);
			if(arrayOfRoots[rootName] != undefined){
				return;
			}

			var rootFolder = {
				type: "folder",
				name: rootName,
				contains: [],
				consumes: consumes,
				produces: produces,
				itemsData: [],
			};
			arrayOfRoots[rootName] = rootFolder;

			dataStructure.push(rootFolder);
		}



		function addGetFunc(pathName, pathData){
			/*Creates an item from the path name and store the path GET data in 
			an associative array in the parent object property "itemsData"*/
			if(pathData.get != undefined){
				var funcName = pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/get.png",
					customData: {requestType: "GET"}
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)].itemsData["GET"+funcName] = pathData.get;
			}
		}

		function addPostFunc(pathName, pathData){
			/*Creates an item from the path name and store the path POST data in 
			an associative array in the parent object property "itemsData"*/
			if(pathData.post != undefined){
				var funcName = pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/post.png",
					customData: {requestType: "POST"}
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)].itemsData["POST"+funcName] = pathData.post;
			}
		}

		function addDeleteFunc(pathName, pathData){
			/*Creates an item from the path name and store the path DELETE data in 
			an associative array in the parent object property "itemsData"*/
			if(pathData.delete != undefined){
				var funcName = pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/delete.png",
					customData: {requestType: "DELETE"}
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)].itemsData["DELETE"+funcName] = pathData.delete;
			}
		}

		function addPatchFunc(pathName, pathData){
			/*Creates an item from the path name and store the path PATCH data in 
			an associative array in the parent object property "itemsData"*/
			if(pathData.patch != undefined){
				var funcName = pathName; 
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/patch.png",
					customData: {requestType: "PATCH"}
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)].itemsData["PATCH"+funcName] = pathData.patch;
			}
		}


		function getRootName(pathName, offset){
			offset = (offset == undefined) ? offset = 0 : offset=offset;

			var splitPathNames = pathName.split("/");
			var rootName = splitPathNames[offset];
			if(rootName.replace(/ /g, '') == ''){
				rootName = splitPathNames[1];
			}
			return rootName;
		}

	}return{
		init: initModule
	}


});