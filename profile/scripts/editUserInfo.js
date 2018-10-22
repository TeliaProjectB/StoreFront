var editing = [];

function enableEditing(id){
	if(editing[id] == false || editing[id] == undefined){//set field status to editing
		editing[id] = true;
		var inputField = document.getElementById(id);
		inputField.disabled = false;
		inputField.className = "normalInput userInfoInputActive";

		document.getElementById("submitEditedInfo").style.display = "block";
	}else{
		editing[id] = false;
		var inputField = document.getElementById(id);
		inputField.disabled = true;
		inputField.className = "normalInput userInfoInput";

		disableSubmitIfNoEditing();
	}
}



function enablePasswordEditing() {
	var passinCurrent = document.getElementById("inputCurrentPassword");
	var passNewInput1 = document.getElementById("inputPasswordEdit1");
	var passNewInput2 = document.getElementById("inputPasswordEdit2");


	var newPasshelp1 = document.getElementById("newPassSpan");
	var newPasshelp2 = document.getElementById("newPassSpanAgain");

	if(editing["password"] == false || editing["password"] == undefined){//set edit password field to true
		editing["password"] = true;
		passinCurrent.style.display = "block";
		passNewInput1.style.display = "block";
		passNewInput2.style.display = "block";

		passinCurrent.disabled = false;
		passNewInput1.disabled = false;
		passNewInput2.disabled = false;

		passinCurrent.className = "normalInput userInfoInputActive";
		passNewInput1.className = "normalInput userInfoInputActive";
		passNewInput2.className = "normalInput userInfoInputActive";

		newPasshelp1.style.display = "block";
		newPasshelp2.style.display = "block";

		document.getElementById("submitEditedInfo").style.display = "block";

	}else{
		editing["password"] = false;
		passinCurrent.style.display = "none";
		passNewInput2.style.display = "none";

		passinCurrent.disabled = true;
		passNewInput1.disabled = true;
		passNewInput2.disabled = true;

		passinCurrent.className = "normalInput userInfoInput";
		passNewInput1.className = "normalInput userInfoInput";
		passNewInput2.className = "normalInput userInfoInput";

		newPasshelp1.style.display = "none";
		newPasshelp2.style.display = "none";

		disableSubmitIfNoEditing();
	}
	
	

}


function disableSubmitIfNoEditing(){
	var keys = Object.keys(editing);
	for(var i=0; i<keys.length; i++){
		if(editing[keys[i]] == true){
			return;
		}
	}
	document.getElementById("submitEditedInfo").style.display = "none";
}



function restoreinputs(){
	var inputsAll = document.getElementsByClassName("normalInput");
	for(var i=0; i<inputsAll.length; i++){
		inputsAll[i].className = "normalInput userInfoInputActive";
	}
}


function sendEditRequest(){
	restoreinputs();

	
	var isFirst = true;
	var postData = "";

	if(editing["inputFirstName"]){
		postData += "inputFirstName="+document.getElementById("inputFirstName").value;
		isFirst = false;
	}

	if(editing["inputLastName"]){
		if(!isFirst){postData+="&";};
		postData += "inputLastName="+document.getElementById("inputLastName").value;
	}

	if(editing["password"]){
		if(!isFirst){postData+="&";};
		if(document.getElementById("inputPasswordEdit1").value != document.getElementById("inputPasswordEdit2").value){
			document.getElementById("inputPasswordEdit1").className = "normalInput";
		   	document.getElementById("inputPasswordEdit2").className = "normalInput userInfoInputError";

			document.getElementById("errorMessage").innerHTML = "Password fields don't match!";

			return;
		}
		postData += "newPassword="+document.getElementById("inputPasswordEdit1").value;
		postData += "&currentPassword="+document.getElementById("inputCurrentPassword").value;
	}



	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/StoreFront/profile/php/updateUserInfo.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		   if(this.readyState == XMLHttpRequest.DONE) {
		   		console.log(this.responseText);
		   		if(this.status == 200){
		   			//This code reloads the same page and does not create a history entry
		   			window.location.replace(window.location.pathname + window.location.search + window.location.hash);
		   		}else{
		   			if(this.responseText == "cpass"){
		   				document.getElementById("errorMessage").innerHTML = "Current password input is incorrect";
		   				document.getElementById("inputCurrentPassword").className = "normalInput userInfoInputError";
		   			}else if(this.responseText == "npass"){
		   				document.getElementById("errorMessage").innerHTML = "New password must at least have 6 characters and may only contain letters A to Z, numbers 1 to 9 and _@!#£&";
		   				document.getElementById("inputPasswordEdit1").className = "normalInput";
		   				document.getElementById("inputPasswordEdit2").className = "normalInput userInfoInputError";
		   			}
		   			
		   		}
		   }
	}
	xhr.send(postData); 
}









