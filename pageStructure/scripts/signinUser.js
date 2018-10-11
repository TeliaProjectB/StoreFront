function checkAPI(statusFromLogin){

    var userID = document.getElementById('ID').value;

    var errorContainer = document.getElementById("errorMessagePanel");

    ajaxRequestSignIn("/StoreFront/pageStructure/php/checkAPI.php", 
                "userID=" + userID, 
                function(responseText, status){
                    if(status == 200){
						//window.open("/StoreFront/home", "_self");
						statusFromLogin(true);
                    }else{
                    	errorContainer.innerHTMl = responseText;
						statusFromLogin(false);
					}
	});

}


function signInUser(statusFromLogin){

    var sendUsername = document.getElementById('username').value;
    var sendPassword = document.getElementById('password').value;

    var errorContainer = document.getElementById("errorMessagePanel");

    ajaxRequestSignIn("/StoreFront/pageStructure/php/signinUser.php", 
                "userName=" + sendUsername +
                "&password=" + sendPassword, 
                function(responseText, status){
                    if(status == 200){
						//window.open("/StoreFront/home", "_self");
						statusFromLogin(true);
                    }else{
                    	errorContainer.innerHTMl = responseText;
						statusFromLogin(false);
					}
	});

}





function ajaxRequestSignIn(phpCode, postData, onLoad){
	var xhr = new XMLHttpRequest();

	var postData = postData;

	xhr.open("POST", phpCode, true);

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("charset", "utf-8");

	xhr.onreadystatechange = function() {//Call a function when the state changes.
	    if(this.readyState == XMLHttpRequest.DONE) {
	    	console.log(this.responseText);
	    	onLoad(this.responseText, this.status);
	    }
	}
	xhr.send(postData); 

}

