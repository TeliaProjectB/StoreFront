define(["scripts/apiSandbox/pathDisplayer", "scripts/apiSandbox/parameterManager"], 
	function(pathDisplayer, parameterManager){
	"use strict";
	
	function initModule(swaggerJSON){
		var paramValuesManager = new parameterManager.init();

		var pathWindow = new pathDisplayer.init(swaggerJSON, paramValuesManager);

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
		var fileSystemTitle = document.getElementById("sandboxFileSystemTitle");
		var fileSystemContainer = document.getElementById("fileSystemContainer");
		var fileSystemElem = document.getElementById("fileSystem");
		var swaggerPatchInfo = document.getElementById("swaggerPatchInfo");
		
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

		
		var fileSystemClickScrollPos = null;

		//public
		this.addPath = function(pathName, pathData, consumes, produces){
			//Collect all similar path names into the same folder name
			addRootFolder(pathName, pathData, consumes, produces);
			
			addGetFunc(pathName, pathData);
			addPostFunc(pathName, pathData);
			addDeleteFunc(pathName, pathData);
			addPatchFunc(pathName, pathData);
		}


		this.setBasePath = function(basePath){
			pathWindow.setBasePath(basePath);
		}

		this.insertDataToSystem = function(){
			fileSystem.insertData(JSON.stringify(dataStructure));
		}


		
		var minimizeFilesystem = function(){
			//Function to minimize filesystem when clicking the arrow above it
			fileSystemSizeDiv.style.transition = "width 0.24s ease-in";
			fileSystemSizeDiv.style.webkitTransition = "width 0.24s ease-in";

			
			fileSystemContainer.style.transition = "opacity 0.24s ease-in";
			fileSystemContainer.style.webkitTransition = "opacity 0.24s ease-in";

			if(fileSystemVisible){
				fileSystemTitle.style.display = "none";
				fileSystemSizeDiv.style.width = "0px";
				fileSystemContainer.style.opacity = "0";
				fileSystemSizeDiv.style.minWidth = "0px";

				fileSystemVisible = false;
				fileSystemMinimizer.style.transform = "rotate(180deg)";
			}else{
				setTimeout(function(){
					fileSystemTitle.style.display = "block";
				}, 240);
				fileSystemContainer.style.opacity = "1";
				fileSystemSizeDiv.style.width = originalWidth;
				fileSystemMinimizer.style.transform = "rotate(0deg)";
				
				fileSystemVisible = true;
			}
			
			
		};
		fileSystemMinimizer.onclick = minimizeFilesystem;

		


		fileSystem.onClickFile = function(name, id, image, customData){
			paramValuesManager.flushParameterList();
			var rootName = getRootName(name);
			
			pathWindow.display(arrayOfRoots[rootName].itemsData[customData.requestType+name], 
				name, 
				arrayOfRoots[rootName].consumes, 
				arrayOfRoots[rootName].produces,
				customData.requestType);

			//Update filesystem height
			fileSystemElem.style.height = swaggerPatchInfo.offsetHeight+"px";
			//

			if(document.getElementById("apiSandboxInfo") != null){
				document.getElementById("apiSandboxInfo").parentElement.removeChild(document.getElementById("apiSandboxInfo"));
			}

			fileSystemClickScrollPos = document.documentElement.scrollTop || document.body.scrollTop;

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



		swaggerPatchInfo.addEventListener("mouseup", function(){
			if(fileSystemVisible){
				minimizeFilesystem();
			}
		});
		swaggerPatchInfo.addEventListener("touch", function(){
			if(fileSystemVisible){
				minimizeFilesystem();
			}
		});

	}return{
		init: initModule
	}


});