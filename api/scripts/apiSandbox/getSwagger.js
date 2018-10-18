define([], function(){
	"use strict";
	
	function initModule(){

		//getApiSwaggerFile.php

		function swaggerAjax(postData, phpSource, onLoad) {
		    var xhr = new XMLHttpRequest();
		    xhr.open("POST", phpSource, true);
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.onreadystatechange = function() {//Call a function when the state changes.
		        if(this.readyState == XMLHttpRequest.DONE) {
		            onLoad(this);
		        }
		    }
		    xhr.send(postData); 

		}

		/*Retrieves the swagger text from the api row of the current api. If the swagger file is null false is returned instead*/
		this.getSwagger = function(apiId, onLoad){
			swaggerAjax("randomId="+apiId, "/StoreFront/api/php/getApiSwaggerFile.php", function(response){
				if(response.status == 200){
					//console.log(response.responseText);
					var swaggerObject = JSON.parse(response.responseText);
					console.log(swaggerObject);
					onLoad(swaggerObject);
				}else{
					onLoad(false);
				}
			});
		}

		

	}return{
		init: initModule
	}


});