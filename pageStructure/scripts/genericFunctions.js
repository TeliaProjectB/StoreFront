var documentCTRLKeyIsActivated = false;
document.addEventListener("keydown", function(e){
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	if(isSafari){
		if(e.keyCode == 91){
			documentCTRLKeyIsActivated = true;
			break;
		}
	}
	if(e.keyCode == 17){//ctrl
		documentCTRLKeyIsActivated = true;
	}
});
document.addEventListener("keyup", function(e){
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	if(isSafari){
		if(e.keyCode == 91){
			documentCTRLKeyIsActivated = false;
			break;
		}
	}

	if(e.keyCode == 17){//ctrl
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
