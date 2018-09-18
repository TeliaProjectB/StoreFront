(function(){
	var isFixed = false;
	var sideBar = document.getElementById("sideBarRealContent");
	var centerContent = document.getElementById("CenterContent");


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

		if(scrollTop < centerContent.offsetTop){
			scrollTop = centerContent.offsetTop;
		}else{

		}

		makeFixedPosition(scrollTop);
	}

	function makeFixedPosition(scrollTop){
		if(window.getComputedStyle(sideBar).position == "absolute"){
			sideBar.style.top = scrollTop+"px";
		}else{
			sideBar.style.top = "0px";
		}
	}



})();