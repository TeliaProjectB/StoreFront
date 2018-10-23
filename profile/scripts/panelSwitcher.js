function clickPanelMinMax(panel, minMaxbutton){
	minMaxbutton = document.getElementById(minMaxbutton);
	panel = document.getElementById(panel);

	if(panel.style.maxHeight == "0px" || panel.style.maxHeight == ""){
		//console.log("show it");
		panel.style.maxHeight = "170vh";
		minMaxbutton.className = "minmaxIcon minPanelIcon";
	}else{
		//console.log("hide it");
		panel.style.maxHeight = "0px";
		minMaxbutton.className = "minmaxIcon maxPanelIcon";
	}

}



