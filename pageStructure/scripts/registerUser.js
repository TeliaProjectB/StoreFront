function registerUser(){

	var userPassword = document.getElementById("registerPassword").value;
	var userEmail = document.getElementById("registerEmail").value;
	var userFirstName = document.getElementById("registerFirstname").value;
	var userLastName = document.getElementById("registerLastname").value;

	var errorContainer = document.getElementById("errorMessagePanel");


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



function uppercase_pressed(e){

    e = (e) ? e : window.event;

    var flagCode = false;
    if (e.which) {
        flagCode = e.which;
    } else if (e.keyCode) {
        flagCode = e.keyCode;
    }

    var flagShift = false;
    if (e.shiftKey) {
        flagShift = e.shiftKey;
    } else if (e.modifiers) {
        flagShift = !!(e.modifiers & 4);
    }

    if (flagCode >= 97 && flagCode <= 122 && flagShift) {
        return true;
    }

    if (flagCode >= 65 && flagCode <= 90 && !flagShift) {
        return true;
    }

    return false;

}

var regPsw = document.getElementById("registerPassword");
if (regPsw) {
    regPsw.addEventListener("keypress",function(e){
        var upper_case = document.getElementById("uppercase_activated");
        if(uppercase_pressed(e)){
            upper_case.innerHTML = "CapsLocks enabled";
            upper_case.style.color = "red";
        }
        else {
            upper_case.innerHTML = "";
        }
    },false);
    
}
