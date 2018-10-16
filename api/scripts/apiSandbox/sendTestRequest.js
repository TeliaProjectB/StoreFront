define([], function(){
	"use strict";
	
	function initModule(resultsWindow){


		function makeAjaxRequest(postData, phpSource, sendMethod, onLoad) {
		    var xhr = new XMLHttpRequest();
		    xhr.open(sendMethod, phpSource, true);
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.onreadystatechange = function() {//Call a function when the state changes.
		        if(this.readyState == XMLHttpRequest.DONE) {
		            onLoad(this);
		        }
		    }
		    xhr.send(postData); 

		}




		this.send = function(pathData, allParameters, requestUrl, onResponse){
			var parameters = [];
			for(var i=0; i<allParameters.length; i++){
				var p = allParameters[i];
				if(parameters[p.getAttribute("in")] == undefined){
					parameters[p.getAttribute("in")] = [];
				}
				parameters[p.getAttribute("in")].push(getValue(allParameters[i]));
			}


			requestUrl = makeRequestURL(requestUrl, parameters);

			var paramData = undefined;

			if(pathData.get != undefined){
				makeAjaxRequest(parameters, requestUrl, "GET", onResponse);
			}else if(pathData.post != undefined){
				makeAjaxRequest(parameters, requestUrl, "POST", onResponse);
			}else if(pathData.patch != undefined){
				makeAjaxRequest(parameters, requestUrl, "PATCH", onResponse);
			}else if(pathData.delete != undefined){
				makeAjaxRequest(parameters, requestUrl, "DELETE", onResponse);
			}

			//makeAjaxRequest("", requestUrl, onResponse);
			
			postInWindowConsole("Sending request to: "+requestUrl);
		}



		function makeRequestURL(requestUrl, parameters){
			if(parameters["path"] == undefined){
				return requestUrl;
			}
			var paths = parameters["path"];

			
			//replace url folder names {name} with their variable value
			for(var i=0; i<paths.length; i++){
				requestUrl = requestUrl.replace("{"+paths[i].nameParam+"}", paths[i].value);
			}

			//Remove repeating double slashes
			requestUrl = requestUrl.replace(/\/\//g, "/");
			return requestUrl;
		}


		function getValue(p){
			var paramObj = {
				targetParamName: p.getAttribute("targetparamname"),
				nameParam: p.getAttribute("name"),//used if param is a body
				in: p.getAttribute("in"),
				value: undefined,
			};

			switch(p.getAttribute("type")){
				case "integer": 
					paramObj.value = parseInt(p.value, 10);
				break;
				case "float": 
					paramObj.value = parseFloat(p.value, 10);
				break;
				default:
					paramObj.value = p.value;
			}

			return paramObj;
		}



		function postInWindowConsole(text){
			resultsWindow.innerHTML = text;
		}
		

	}return{
		init: initModule
	}


});