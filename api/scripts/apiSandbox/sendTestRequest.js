define([], function(){
	"use strict";
	
	function initModule(swaggerJSON, resultsWindow, paramValuesManager){
		var consumes = "text/plain";
		var produces = "text/plain";


		var sendingRequest  = false;

		function makeAjaxRequest(phpSource, sendMethod, bodyData, onLoad) {
			sendingRequest = true;
		    var xhr = new XMLHttpRequest();
		    xhr.open(sendMethod, phpSource, true);
		    xhr.setRequestHeader("Content-Type", consumes);
		    xhr.onreadystatechange = function() {//Call a function when the state changes.
		        if(this.readyState == XMLHttpRequest.DONE) {
		        	sendingRequest  = false;
		        	if(this.status == 200){
			        	postInWindowConsole("Sucess:\n", "info");
			        	postInWindowConsole(this.responseText+"\n\n", "text");
			        	onLoad(this);
			        }else{
			        	postInWindowConsole(this.status+" Server error :\n", "error");
			        	postInWindowConsole(this.responseText+"\n\n", "errorText");
			        }
		        }
		    }

		    xhr.onerror = function(){
		    	console.log("onerror");
		    	sendingRequest  = false;
			    //clearConsole();
			    postInWindowConsole("Terminal server error.\n", "error");
		    };

		    xhr.onabort = function(){
		    	console.log("onabort");
		    	sendingRequest  = false;
			    //clearConsole();
			    postInWindowConsole("Terminal sending error. Query aborted. Check website console log nor more info.\n", "error");
		    };

		    if(bodyData !== null){
		    	bodyData = JSON.stringify(bodyData);
		    	xhr.send(bodyData);
		    }else{
		    	xhr.send();
		    }
		    
		}




		this.send = function(pathData, requestUrl, requestMethod, onResponse){
			if(sendingRequest){
				postInWindowConsole("Please wait\n", "error");
				return;
			}

			var params = paramValuesManager.getParameters();

			var bodyData = null;

			var sendingType = "";

			for(var i=0; i<params.length; i++){
				if(params[i].in == "path"){
					requestUrl = addPathParam(requestUrl, params[i]);
				}else if(params[i].in == "query"){
					sendingType = "query";
					requestUrl = addQueryParam(requestUrl, params[i]);
				}else if(params[i].in == "body"){
					sendingType = "body";
					
					if(bodyData == null){
						bodyData = {};
					}
					if(params[i].type == "object"){
						bodyData = {};
					}else if(params[i].type == "array"){
						bodyData = [];
					}
					//console.log(params[i]);
					addBodyData(bodyData, params[i]);

					if(bodyData[params[i].name] !== undefined){
						bodyData = bodyData[params[i].name];
					}
					
				}
			}

			//console.log(bodyData);

			requestUrl = getSendingScheme(requestUrl);
			


			clearConsole();
			postInWindowConsole("Sending "+sendingType+" request to: \n", "loading");
			postInWindowConsole(requestUrl+"\n\n", "info");


			makeAjaxRequest(requestUrl, requestMethod, bodyData, onResponse);

			

			//console.log("requestUrl: "+requestUrl);
		}


		function getSendingScheme(requestUrl){
			var sendScheme = "http";
			if(swaggerJSON.schemes != undefined){
				if(typeOf(swaggerJSON.schemes) == "array"){
					for(var i=0; i<swaggerJSON.schemes.length; i++){
						if(swaggerJSON.schemes[i] == "https"){
							sendScheme = "https";
							break;
						}
					}
				}
			}

			return sendScheme+"://"+requestUrl;
		}


		function addBodyData(dataCon, param){
			if(param.type == "value"){
				if(typeOf(dataCon) == "object"){
					dataCon[param.name] = getValueFromParam(param);
				}else if(typeOf(dataCon) == "array"){
					dataCon.push(getValueFromParam(param));
				}
			}

			if(param.next != undefined){
				for(var i=0; i<param.next.length; i++){
					if(param.next[i].type == "value"){
						addBodyData(dataCon, param.next[i]);
					}else if(param.next[i].type == "object"){
						var targetCon;
						if(typeOf(dataCon) == "object"){
							if(param.next[i].name == undefined){

							}
							dataCon[param.next[i].name] = {};
							targetCon = dataCon[param.next[i].name];

							
						}else if(typeOf(dataCon) == "array"){
							//console.log();
							dataCon.push({});
							targetCon = dataCon[dataCon.length-1];
							
						}
						
						addBodyData(targetCon, param.next[i]);
						
						
					}else if(param.next[i].type == "array"){
						dataCon[param.next[i].name] = [];
						addBodyData(dataCon[param.next[i].name], param.next[i]);
					}
					
				}
			}
			
		}


		function getValueFromParam(param){
			if(param.inputType == "number"){
				return parseFloat(param.inputField.value);
			}else if(param.inputType == "integer"){
				return parseInt(param.inputField.value, 10);
			}else if(param.inputType == "string"){
				return param.inputField.value;
			}else if(param.inputType == "boolean"){
				if(param.inputField.value === "true" || 
					param.inputField.value === true || 
					param.inputField.value === 1){
					return true;
				}
				return false;
			}
			return null;
		}



		function addQueryParam(requestUrl, param){
			var paramSpacer = "&";
			if(requestUrl.indexOf("?") == -1){
				paramSpacer = "?";
			}

			var queryValue = param.next[0].inputField.value;

			requestUrl += paramSpacer+param.name+"="+queryValue;

			return requestUrl;
		}



		function addPathParam(requestUrl, param){
			//replace url folder names {name} with their variable value
			var pathValue = getValueFromParam(param.next[0]);

			requestUrl = requestUrl.replace("{"+param.name+"}", pathValue)+"/";

			//Remove repeating double slashes
			requestUrl = requestUrl.replace(/\/\//g, "/");

			return requestUrl;
		}



		function clearConsole(){
			while(resultsWindow.firstChild){
				resultsWindow.removeChild(resultsWindow.firstChild);
			}
		}


		function postInWindowConsole(text, textType){
			text = text.replace(/\n/g, "</br>");
			var textSpan = document.createElement("div");
			if(textType == "loading"){
				textSpan.className = "sandBoxResponseLoading";
			}else if(textType == "info"){
				textSpan.className = "sandBoxResponseInfo";
			}else if(textType == "error"){
				textSpan.className = "sandBoxResponseError";
			}else if(textType == "text"){
				textSpan.className = "sandBoxResponseText";
			}else if(textType == "errorText"){
				textSpan.className = "sandBoxResponseErrorText";
			}
			textSpan.innerHTML = text;
			resultsWindow.appendChild(textSpan);
			resultsWindow.scrollTop = resultsWindow.scrollheight;
		}
		


		this.setConsumesProduces = function(consumes, produces){
			consumes = consumes;
			produces = produces;
		}



		function typeOf(value) {
		    var s = typeof value;
		    if (s === 'object') {
		        if (value) {
		            if (value instanceof Array) {
		                s = 'array';
		            }
		        } else {
		            s = 'null';
		        }
		    }
		    return s;
		}





	}return{
		init: initModule
	}


});