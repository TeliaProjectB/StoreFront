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





function sendEditRequest(){
	var isFirst = true;
	var postData = "";

	if(editing["inputFirstName"]){
		postData += "inputFirstName="+document.getElementById("inputFirstName").value;
		isFirst = false;
	}

	if(editing["inputLastName"]){
		if(!isFirst){postData+="&";};
		postData += "inputLastName="+document.getElementById("inputFirstName").value;
	}

	if(editing["password"]){
		if(!isFirst){postData+="&";};
		if(document.getElementById("inputPasswordEdit1").value != document.getElementById("inputPasswordEdit2").value){
			document.getElementById("errorMessage").innerHMTL = "Password fields don't match!";
			return;
		}
		postData += "newPassword="+document.getElementById("inputPasswordEdit1").value;
		postData += "&currentPassword="+document.getElementById("inputCurrentPassword").value;
	}



	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/StoreFront/myAccount/php/updateUserInfo.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		   if(this.readyState == XMLHttpRequest.DONE) {
		   		if(this.status == 200){
		   			//This code reloads the same page and does not create a history entry
		   			window.location.replace(window.location.pathname + window.location.search + window.location.hash);
		   		}else{
		   			document.getElementById("errorMessage").innerHMTL = this.responseText;
		   		}
		   }
	}
	xhr.send(postData); 
}









