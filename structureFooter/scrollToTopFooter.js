function footerScrollToTop(){
	$([document.documentElement, document.body]).animate({
		scrollTop: '0px',
	}, 1000);
}


// only make go back to topvisible if user is scrolling down
(function(){
	var goToTopElem = document.getElementById("goToTopText");
	var changeTimer;

	var lastScrollTop = 0;
	$(window).scroll(function () {
	    var scrollTop = $(this).scrollTop();

	    if(scrollTop - lastScrollTop > 0){
	    	if(changeTimer!=undefined){
	    		clearTimeout(changeTimer);
	    	}
	    	changeTimer = setTimeout(function(){
	    		goToTopElem.style.pointerEvents = "auto";
	    		goToTopElem.style.opacity = "1";
	    	}, 80);
	    }else{
	    	if(changeTimer!=undefined){
	    		clearTimeout(changeTimer);
	    	}
	    	changeTimer = setTimeout(function(){
	    		goToTopElem.style.pointerEvents = "none";
	    		goToTopElem.style.opacity = "0";
	    	}, 80);
	    }

	    lastScrollTop = scrollTop;
	});
})();
