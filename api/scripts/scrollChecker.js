(function(){
	var isFixed = false;
	var contentContainer = document.getElementById("contentContainer");
	var sideBar = document.getElementById("sideBarRealContent");
	var centerContent = document.getElementById("CenterContent");
	var header = document.getElementById("head");

	sideBar.style.marginTop = contentContainer.offsetTop+"px";

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

		makeFixedPosition(scrollTop);
	}

	function makeFixedPosition(scrollTop){
		if(window.getComputedStyle(sideBar).position == "absolute"){
			var body = document.body,
		    html = document.documentElement;
		
			var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

			if(scrollTop+sideBar.offsetHeight+128+topOffset > bodyHeight){
				sideBar.style.top = (bodyHeight-sideBar.offsetHeight-128-topOffset)+"px";
			}else{
				sideBar.style.top = scrollTop+"px";
			}
			
		}else{
			sideBar.style.top = "0px";
		}
	}



	setInterval(function(){
		updatePosition();
	}, 200);




})();