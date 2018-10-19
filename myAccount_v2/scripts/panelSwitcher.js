function clickPanelMinMax(panel, minMaxbutton){
	minMaxbutton = document.getElementById(minMaxbutton);
	panel = document.getElementById(panel);


	if(panel.style.maxHeight == "0px" || panel.style.maxHeight == ""){
		//console.log("show it");
		panel.style.maxHeight = "500px";
		minMaxbutton.className = "minmaxIcon minPanelIcon";
	}else{
		//console.log("hide it");
		panel.style.maxHeight = "0px";
		minMaxbutton.className = "minmaxIcon maxPanelIcon";
	}

	setTimeout(function(){
		updatePanelOverflow();
	}, 450);
}



//Addautomatic scroll bar on tall panels
setInterval(function(){
	updatePanelOverflow();
}, 250);

function updatePanelOverflow(){
	//The scrollbar is ugly on clean white panels so they should be hidden when they are not needed
	var panels = document.getElementsByClassName("panelContent");
	for(var i=0; i<panels.length; i++){
		if(panels[i].clientHeight >= 500){
			panels[i].style.overflowY = "scroll";
		}else{
			panels[i].style.overflowY = "hidden";
		}
	}
}