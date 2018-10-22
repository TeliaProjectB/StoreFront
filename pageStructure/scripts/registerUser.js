function registerUser(){
	document.getElementById("errorMessagePanel").innerHTML = "";

	var userPassword = document.getElementById("registerPassword").value;
	var userEmail = document.getElementById("registerEmail").value;
	var userFirstName = document.getElementById("registerFirstname").value;
	var userLastName = document.getElementById("registerLastname").value;

	var errorContainer = document.getElementById("errorMessagePanel");

	var termsCheckBox = document.getElementById("agreedToTerms");

	if(!termsCheckBox.checked){
		document.getElementById("errorMessagePanel").innerHTML = "You need to agree to the terms of service before you may register.";
		return;
	}

	ajaxRequest("/StoreFront/pageStructure/php/registerUser.php", "password="
		+userPassword+"&email="+userEmail+
		"&firstname="+userFirstName+
		"&lastname="+userLastName, 
		function(responseText, status){
			if(status == 200){
				window.open("/StoreFront/home", "_self");
			}else if(status == 500){
				errorContainer.innerHTML = responseText;
			}
	});
}





function ajaxRequest(phpCode, postData, onLoad){
	var xhr = new XMLHttpRequest();

	var postData = postData;

	xhr.open("POST", phpCode, true);

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {//Call a function when the state changes.
	    if(this.readyState == XMLHttpRequest.DONE) {
	    	console.log(this.responseText);
	    	onLoad(this.responseText, this.status);
	    }
	}
	xhr.send(postData); 



}