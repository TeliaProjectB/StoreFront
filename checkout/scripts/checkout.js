function removeApiFromCart(apiId, element){
	var xhr = new XMLHttpRequest();
	var postData = "apiId="+apiId;
	xhr.open("POST", "/StoreFront/checkout/php/deleteFromTrolly.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			console.log(this.responseText);
			element = document.getElementById(element);
			element.style.opacity = "0";
			setTimeout(function(){
				element.parentElement.removeChild(element);

				var trolleyCounter = document.getElementById("itemCount");
				trolleyCounter.style.display = "block";
				trolleyCounter.innerHTML = parseInt(trolleyCounter.innerHTML, 10)-1;
				if(parseInt(trolleyCounter.innerHTML, 10) <= 0){
					trolleyCounter.style.display = "none";
					document.getElementById("purchaseButton").parentElement.removeChild(document.getElementById("purchaseButton"));
				}
				updatePrice();

			}, 700);
			
		}
	}
	xhr.send(postData);
}

function updatePrice(){
	var priceContainer = document.getElementById("priceAmount");

	var newPrice = 0;
	var prices = document.getElementsByClassName("apiRowPrice");
	for(var i=0; i<prices.length; i++){
		newPrice += parseInt(prices[i].innerHTML, 10);
	}

	priceContainer.innerHTML = "Total amount: "+newPrice+" kronor.";
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
