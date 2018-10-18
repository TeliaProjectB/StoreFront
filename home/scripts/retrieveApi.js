define(["apiBoxCreator"], function(apiBoxCreator){
	function initModule(){
		var boxCreator = new apiBoxCreator.init();


		this.loadApisRows = function(apiContainer, category, onLoad){
			/*This function loads apifrom a given category. generates elements for each api and puts them in a moving wrapper.
			After that itsends the container back*/
			ajaxRequest(category, function(data){
				//convert json response to javascript objects
				if(data.replace(/ /g, '') == ''){return;}
				var retrievedData = JSON.parse(data);

				//create api moving wrapper container
				var apiMoveWrapper = document.createElement("div");
				apiMoveWrapper.className = "apiTransitionWrapper";
				
				//Itterate through every receieved api and create and api element. Append the element to apiMoveWrapper
				for(var i=0; i<retrievedData.length; i++){
					if(i == 0){//if i==0 then we are at the first api box. send tru to markit so users can naviget easier
						boxCreator.createApiBox(apiMoveWrapper, retrievedData[i], true);
					}else{
						boxCreator.createApiBox(apiMoveWrapper, retrievedData[i], false);
					}
				}

				//Append the moving wrapper container to the parent container
				apiContainer.appendChild(apiMoveWrapper);

				//Load on complete function and send the
				//Send as parameters the number of api that were loaded and the parent container
				onLoad(retrievedData.length, apiMoveWrapper);

			}, apiContainer.getAttribute("maximum"));
			/*
			apiContainer.getAttribute("maximum"): each parent element has an attribute called "macimum" that tells
			the server how many api it should load at max
			*/
			

		}


		this.loadApisBoxes = function(apiContainer, category, onLoad){
			/*This function loads apifrom a given category. generates elements for each api and puts them in a container.
			After that itsends the container back*/
			ajaxRequest(category, function(data){
				//convert json response to javascript objects
				var retrievedData = JSON.parse(data);

				//create api moving wrapper container
				var apiBoxContainer = document.createElement("div");
				apiBoxContainer.className = "simpleBoxContainer";
				
				//Itterate through every receieved api and create and api element. Append the element to simpleBoxContainer
				for(var i=0; i<retrievedData.length; i++){
					boxCreator.createSimpleBox(apiBoxContainer, retrievedData[i]);
				}

				//Append the simple box container to the parent container
				apiContainer.appendChild(apiBoxContainer);

				//Load on complete function and send the
				//Send as parameters the number of api that were loaded and the parent container
				onLoad(retrievedData.length, apiBoxContainer);

			}, apiContainer.getAttribute("maximum"));
			/*
			apiContainer.getAttribute("maximum"): each parent element has an attribute called "macimum" that tells
			the server how many api it should load at max
			*/
		}



		function ajaxRequest(category, onLoad, limit) {
			/*Makes ajax request toretrieve apis. limit indicates howmany the server can send at max*/
			limit = (limit == undefined) ? limit = 32 : limit = limit;
			var xhr = new XMLHttpRequest();
			var postData = "category="+category+"&limit="+limit;
			xhr.open("POST", "php/retrieveApi.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			    	//on a successfull response "onLoad" is called
			    	onLoad(this.responseText);
			    }
			}
			xhr.send(postData); 
		}



	}return{
		init: initModule
	}
});
