function addToCart(){
	var sideBarContent = document.getElementById("sideBarRealContent");
	var header= document.getElementById("head");
	var cloneParent  = document.getElementById("apiIcon");
	var offsets = cloneParent.getBoundingClientRect();
	var clonedImage = cloneParent.cloneNode();

	var doc = document.documentElement;
	var offsetTopRelativePos = 0;
	var leftContainerOffsetTop = parseInt(sideBarContent.style.top, 10);
	if(leftContainerOffsetTop == 0){
		offsetTopRelativePos = header.offsetHeight;
	}

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
	

}

var addToCartbutton = document.getElementById("purchaseButton");
addToCartbutton.addEventListener("mouseup", addToCart);