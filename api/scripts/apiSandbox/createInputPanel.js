define([], function(){
	"use strict";
	
	function initModule(){





		this.createPanel = function(panel, nameElem){
			hidePanelsContent(panel);
			panel.style.maxHeight = "32px";
			panel.setAttribute("minimized", "true");


			var panelsTitle = panel.getElementsByClassName("swaggerTitle")[0];
			var panelToggleButton = panelsTitle.getElementsByTagName("BUTTON")[0];

			panelToggleButton.addEventListener("mouseup", function(e){

				var updateButtonText = "";
				if(panel.getAttribute("minimized") == "true"){
					showPanelsContent(panel);
					panel.setAttribute("minimized", "false");
					panel.style.maxHeight = "";
					updateButtonText = "url('img/minus.svg')";

				}else if(panel.getAttribute("minimized") == "false"){
					panel.setAttribute("minimized", "true");
					panel.style.maxHeight = "32px";
					panel.style.overflowY = "hidden";
					updateButtonText = "url('img/plus.svg')";
					//Hide content thwn animation is done
					hidePanelsContent(panel);
				}


				var panelsTitle = panel.getElementsByClassName("swaggerTitle")[0];
				var panelToggleButton = panelsTitle.getElementsByTagName("button")[0];
				panelToggleButton.style.backgroundImage = updateButtonText;
			});

		}


		function hidePanelsContent(panel){
			var directChildren = panel.children;
			for(var i=0; i<directChildren.length; i++){
				if(directChildren[i].tagName == "DIV"){
					directChildren[i].style.opacity = "0";
				}
			}
		}

		function showPanelsContent(panel){
			var directChildren = panel.children;
			for(var i=0; i<directChildren.length; i++){
				if(directChildren[i].tagName == "DIV"){
					directChildren[i].style.opacity = "1";
				}
			}
		}


		this.getPanelTogglebutton = function(){
			var button = document.createElement("button");
			button.className = "sandboxMinMaxButton";
			button.style.backgroundImage = "url('img/plus.svg')";
			return button;
		}

		

	}return{
		init: initModule
	}


});