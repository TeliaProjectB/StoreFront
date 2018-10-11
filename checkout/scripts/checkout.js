function removeApiFromCart(apiId, element){
	var xhr = new XMLHttpRequest();
	var postData = "apiId="+apiId;
	xhr.open("POST", "/StoreFront/checkout/php/deleteFromTrolly.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			//console.log(this.responseText);
			element = document.getElementById(element);
			element.style.opacity = "0";
			setTimeout(function(){
				element.parentElement.removeChild(element);

				var trolleyCounter = document.getElementById("itemCount");
				console.log(trolleyCounter);
				trolleyCounter.innerHTML = parseInt(trolleyCounter.innerHTML, 10)-1;

			}, 700);
			
		}
	}
	xhr.send(postData);
}



function purchase(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/StoreFront/checkout/php/purchaseTrollyList.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			console.log(this.responseText);
			alert("Success! Youare now the owner of these API.");
			window.open("/StoreFront/myAccount/items/?index=boughtItems", "_self");
		}
	}
	xhr.send("");
}
