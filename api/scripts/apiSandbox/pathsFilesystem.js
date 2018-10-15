define(["scripts/apiSandbox/patchDisplayer"], function(patchDisplayer){
	"use strict";
	
	function initModule(){
		var patchWindow = new patchDisplayer.init();

		var parameters = {
			itemName: "File",
			disableInteraction: true,
			onlyUniqueNames: true,
			createItemButtonOn: true,
			canResize: false
		};
		var system = new prettyFiles.init().getInit("fileSystem", parameters);


		var arrayOfRoots = [];

		var dataStructure = [];

		//public
		this.addPath = function(pathName, pathData, consumes, produces){
			//get root name of path
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
			system.insertData(JSON.stringify(dataStructure));
		}


		system.onClickFile = function(name, id, procced){
			var rootName = getRootName(name, 2);
			
			patchWindow.display(arrayOfRoots[rootName][name], name, arrayOfRoots[rootName].consumes, arrayOfRoots[rootName].produces);
		};

		function addRootFolder(pathName, pathData, consumes, produces){
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
			};
			arrayOfRoots[rootName] = rootFolder;

			dataStructure.push(rootFolder);
		}



		function addGetFunc(pathName, pathData){
			if(pathData.get != undefined){
				var funcName = "<div style='display:none;'>GET: </div>"+pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/get.png",
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)][funcName] = pathData.get;
			}
		}

		function addPostFunc(pathName, pathData){
			if(pathData.post != undefined){
				var funcName = "<div style='display:none;'>POST: </div>"+pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/post.png",
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)][funcName] = pathData.post;
			}
		}

		function addDeleteFunc(pathName, pathData){
			if(pathData.delete != undefined){
				var funcName = "<div style='display:none;'>DELETE: </div>"+pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/delete.png",
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)][funcName] = pathData.delete;
			}
		}

		function addPatchFunc(pathName, pathData){
			if(pathData.patch != undefined){
				var funcName = "<div style='display:none;'>PATCH: </div>"+pathName;
				var functionItem = {
					type: "file",
					name: funcName,
					image: "scripts/apiSandbox/icons/patch.png",
				};
				arrayOfRoots[getRootName(pathName)].contains.push(functionItem);
				arrayOfRoots[getRootName(pathName)][funcName] = pathData.patch;
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