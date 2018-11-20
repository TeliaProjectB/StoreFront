function clickPanelMinMax(panel, minMaxbutton){
	minMaxbutton = document.getElementById(minMaxbutton);
	panel = document.getElementById(panel);


	//Get height of panel header and set the panel height limit to its height
	var panelHeader = panel.parentElement.getElementsByTagName("h2")[0];
	console.log(parseInt(panelHeader.style.marginTop, 10));
	var limitHeight = panelHeader.offsetHeight + parseInt(panelHeader.style.marginTop, 10) + parseInt(panelHeader.style.marginBottom, 10);
	console.log(limitHeight);

	//Get panel content's real height
	var panelContent = panel.getElementsByClassName("panelContent")[0];
	console.log(panelContent);
	var contentHeight = panelContent.offsetHeight+64;

	if(contentHeight > window.innerHeight*0.73){
		contentHeight = window.innerHeight*0.73;
	}

	if(panel.style.maxHeight == "0px"){
		console.log("1");
		panel.style.maxHeight = contentHeight+"px";
		minMaxbutton.className = "minmaxIcon minPanelIcon";
	}else{
		console.log("hide it");
		panel.style.maxHeight = "0px";
		minMaxbutton.className = "minmaxIcon maxPanelIcon";
	}

}



