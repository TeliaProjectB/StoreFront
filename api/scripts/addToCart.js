function addToCart(apiId, isPackage){
	var sideBarContent = document.getElementById("sideBarRealContent");
	var header= document.getElementById("head");
	var cloneParent  = document.getElementById("apiIcon");
	var offsets = cloneParent.getBoundingClientRect();
	var clonedImage = cloneParent.cloneNode();

	var apiBackgroundDiv = document.getElementById("apiIconBackground");

	clonedImage.style.backgroundImage = apiBackgroundDiv.style.backgroundImage;
	clonedImage.style.backgroundSize = "contain";
	clonedImage.style.backgroundPosition = "center";
	clonedImage.style.backgroundRepeat = "no-repeat";



	var doc = document.documentElement;
	var offsetTopRelativePos = 0;
	
	var doc = document.documentElement;
	var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

	var leftContainerOffsetTop = sideBarContent.offsetTop-scrollTop;
	/*var leftContainerOffsetTop = parseInt(sideBarContent.style.top, 10);
	if(leftContainerOffsetTop == 0){
		offsetTopRelativePos = header.offsetHeight;
	}*/

	clonedImage.className += " addToCartAnimation";
	clonedImage.style.margin = "0px";
	clonedImage.style.position = "fixed";
	clonedImage.style.top = leftContainerOffsetTop+offsetTopRelativePos+"px";
	clonedImage.style.left = offsets.left+"0px";
	clonedImage.style.zIndex = "400";

	document.body.appendChild(clonedImage);


	setTimeout(function(){
		clonedImage.parentElement.removeChild(clonedImage);
	}, 1950);



	var xhr = new XMLHttpRequest();
	if(isPackage == 1 || isPackage == true){
		xhr.open("POST", "/StoreFront/api/php/addApiPackageToCart.php", true);
	}else{
		xhr.open("POST", "/StoreFront/api/php/addToCart.php", true);
	}
	
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(this.readyState == XMLHttpRequest.DONE) {
			console.log(this.responseText);
			setTimeout(function(){
				var trolleyCounter = document.getElementById("itemCount");
				trolleyCounter.style.display = "block";
				trolleyCounter.innerHTML = parseInt(trolleyCounter.innerHTML, 10)+1;
			}, 950);
			
		}
	}
	 xhr.send("apiRandId="+apiId); 

		
	

}


function openRegisterPanel(){
	setTimeout(function(){
		var slidingLoginWindow = document.getElementsByClassName("loginWindow")[0];
		openSlideInWindow();
		//openRegisterWindow();
	}, 32);
}


