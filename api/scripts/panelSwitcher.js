(function(){
	var addFancyClicking = new fancyClicker;
	//Panels
	var infoPanel = document.getElementById("infoPanel");
	var sandboxPanel = document.getElementById("sandboxPanel");
	var commentPanel = document.getElementById("commentPanel");
	var recommendPanel = document.getElementById("recommendPanel");

	//Buttons controlling the panels
	var infoButton = document.getElementById("infoButton");
	var sandboxButton = document.getElementById("sandboxButton");
	var commentsButton = document.getElementById("commentsButton");
	var recommendedButton = document.getElementById("recommendedButton");

	infoButton.onclick = function(){
		resetAllButtonsColors();
		hideAllPanels();
		infoPanel.style.display = "block";
		infoButton.className = "rowButton panelButtonBackground rowButtonActive";
		//infoButton.style.backgroundColor = "#cc00ff";
	};

	sandboxButton.onclick = function(){
		resetAllButtonsColors();
		hideAllPanels();
		sandboxPanel.style.display = "block";
		sandboxButton.className = "rowButton panelButtonBackground rowButtonActive";
		//sandboxButton.style.backgroundColor = "#cc00ff";
	};

	commentsButton.onclick = function(){
		resetAllButtonsColors();
		hideAllPanels();
		commentPanel.style.display = "block";
		commentsButton.className = "rowButton panelButtonBackground rowButtonActive";
		//commentsButton.style.backgroundColor = "#cc00ff";

		var messagesContainer = document.getElementsByClassName("messageBoxMessageContainer")[0];
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	};

	recommendedButton.onclick = function(){
		resetAllButtonsColors();
		hideAllPanels();
		recommendPanel.style.display = "block";
		recommendedButton.className = "rowButton panelButtonBackground rowButtonActive";
		//recommendedButton.style.backgroundColor = "#cc00ff";
	};


	function resetAllButtonsColors(){
		infoButton.className = "rowButton panelButtonBackground";
		sandboxButton.className = "rowButton panelButtonBackground";
		commentsButton.className = "rowButton panelButtonBackground";
		recommendedButton.className = "rowButton panelButtonBackground";
	}

	function hideAllPanels(){
		infoPanel.style.display = "none";
		sandboxPanel.style.display = "none";
		commentPanel.style.display = "none";
		recommendPanel.style.display = "none";
	}



	infoPanel.style.display = "block";

	setTimeout(function(){
		var contentContainer = document.getElementById("contentContainer");	
		contentContainer.style.opacity = "1";
	}, 200);
	


	//get all 3d panels
	var panels3d = document.getElementsByClassName("panel3d");
	for(var i=0; i<panels3d.length; i++){
		animatePanel(panels3d[i], i);
	}


	function animatePanel(panel, index){
		var waitTime = Math.log((index+1)*(Math.pow(500, (index+1))))*18;
		setTimeout(function(){
			panel.style.transform += " perspective(2000px) rotateY(0deg) scaleX(1) scaleY(1) ";
			
			/*switch(panel.id){
				case "miniInfoBuyPanel": addFancyClicking.addFancy(panel, 5, 1);
				break;
			}*/
			
		}, waitTime);
	}


	

	hideAllPanels();
	infoPanel.style.display = "block";
	infoButton.className = "rowButton panelButtonBackground rowButtonActive";


	

})();