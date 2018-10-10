(function(){
	var isFixed = false;
	var contentContainer = document.getElementById("contentContainer");
	var sideBar = document.getElementById("sideBarRealContent");
	var centerContent = document.getElementById("CenterContent");
	var header = document.getElementById("head");

	var footerContent = document.getElementById("footerStyle");


	var topOffset = header.offsetHeight + parseInt(window.getComputedStyle(header).marginBottom, 10);
	topOffset+=32;


	var firstOffsetTop = sideBar.offsetTop;
	window.addEventListener("scroll", function(){
		updatePosition();
	});

	window.onresize = function(){
		updatePosition();
	};



	function updatePosition(){
		var doc = document.documentElement;
		var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		/*if(scrollTop < centerContent.offsetTop){
			scrollTop = centerContent.offsetTop;
		}*/
		window.requestAnimationFrame(function() {
	    	makeFixedPosition(scrollTop);
	    });
		
	}

	function makeFixedPosition(scrollTop){
		if(window.getComputedStyle(sideBar).position == "fixed"){
			var body = document.body,
		    html = document.documentElement;
		
			var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

			var headerHeight = header.offsetHeight;

			var requestedPosition;
			if(isOver(scrollTop)){
				requestedPosition = (headerHeight);
			}else{
				requestedPosition = (centerContent.offsetTop-scrollTop);
			}

			if(requestedPosition+scrollTop+headerHeight+48 > bodyHeight-scrollTop){
				console.log("set");
				requestedPosition = bodyHeight-scrollTop-sideBar.offsetHeight-116;
			}

			sideBar.style.top = requestedPosition+"px";
			
		}else{
			sideBar.style.top = "0px";
		}
	}




	function isOver(scrollTop){
		var body = document.body,
		    html = document.documentElement;
		
		var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

		var minus = header.offsetHeight;
		if(minus >= topOffset){
			minus = 0;
		}

		if(scrollTop+16 > topOffset-header.offsetHeight){
			return true;
		}
		return false;
	}


	setInterval(function(){
		updatePosition();
	}, 18);




})();