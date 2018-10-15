define([], function(){
	function initModule(messVars){


		this.ajaxRequest = function(postData, phpSource, onLoad) {
		    var xhr = new XMLHttpRequest();


		    xhr.open("POST", phpSource, true);

		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		    xhr.onreadystatechange = function() {//Call a function when the state changes.
		    	//console.log(this.responseText);
		        if(this.readyState == XMLHttpRequest.DONE) {
		            onLoad(this);
		        }
		    }
		    xhr.send(postData); 

		}



	}return{
		init: initModule
	}
});