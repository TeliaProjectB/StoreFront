var documentCTRLKeyIsActivated = false;
document.addEventListener("keydown", function(e){
	if(e.keyCode == 17){
		documentCTRLKeyIsActivated = true;
	}
});
document.addEventListener("keyup", function(e){
	if(e.keyCode == 17){
		documentCTRLKeyIsActivated = false;
	}
});
function smartJsLink(smartLinkURL){
	console.log(documentCTRLKeyIsActivated);
	if(documentCTRLKeyIsActivated){
		window.open(smartLinkURL);
	}else{
		window.open(smartLinkURL, "_self");
	}
}