function signInUser(){

    var sendUsername = document.getElementById('username').value;
    var sendPassword = document.getElementById('password').value;
	


    ajaxRequest("/StoreFront/pageStructure/php/signinUser.php", 
                "userName=" + sendUsername +
                "&password=" + sendPassword, 
                function(responseText, status){
                    if(status == 200){
                        window.open("/StoreFront/home", "_self");
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