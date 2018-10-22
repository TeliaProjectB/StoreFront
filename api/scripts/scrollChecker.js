(function(){
	var sideBar = document.getElementById("sideBarRealContent");
	var centerContent = document.getElementById("CenterContent");
	var header = document.getElementById("head");
	var footerContent = document.getElementById("footerStyle");
	var pageContainerWrapper = document.getElementsByClassName("pageContentWrapper")[0];




	function makeFixedPosition(scrollTop){
		//If the window size is big enough for the sidebar to scroll
		if(window.getComputedStyle(sideBar).position == "fixed"){

			var requestedPosition;
			if(isOverContentContainer(scrollTop)){//If header is over content container, put sidebar right below it
				requestedPosition = header.offsetHeight;
			}else{//Else put the sidebar at the content top minus scroll bar so it follows the content container on scrolling.
				requestedPosition = Math.round(centerContent.offsetTop-scrollTop);
			}

			
			//Calculate how much the sidebars bottom is overlapping the footer.
			var footerOverlapping = Math.round(bottomIsOverFooter(scrollTop, requestedPosition));
			//Remove the overlapping from th requested position to limit its position
			sideBar.style.top = (requestedPosition-footerOverlapping)+"px";
			

			
			
		}else{//The screen is too small, attach it to the top
			sideBar.style.top = "0px";
		}
	}


	function bottomIsOverFooter(scrollTop, requestedPosition){
		//create variable of the allowed space the penel can move inside. The body height minus the footer height
		var body = document.body,
		    html = document.documentElement;
		var allowedSpace = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight) - footerContent.offsetHeight;
		//var allowedSpace = pageContainerWrapper.offsetHeight;


		var sidePanelRelativeBottomPos = scrollTop + requestedPosition + sideBar.offsetHeight;

		if(sidePanelRelativeBottomPos > allowedSpace){
			return sidePanelRelativeBottomPos-allowedSpace;
		}
		return 0;
	}



	function isOverContentContainer(scrollTop){
		//If scroll position plus header height is larger than the top offset of the content container
		//Then the header is above the content container
		if(scrollTop+header.offsetHeight > pageContainerWrapper.offsetTop){
			return true;
		}
		return false;
	}



	function updatePosition(){
		var doc = document.documentElement;
		var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		makeFixedPosition(scrollTop);
	}

	setInterval(updatePosition, 14);
	window.onresize = updatePosition;
	window.onscroll = updatePosition;

})();