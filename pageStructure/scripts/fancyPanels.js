//get all 3d panels
var panels3d = document.getElementsByClassName("panel3d");
for(var i=0; i<panels3d.length; i++){
	animatePanel(panels3d[i], i);
}


function animatePanel(panel, index){
	var waitTime = Math.log((index+1)*(Math.pow(500, (index+1))))*18;
	setTimeout(function(){
		panel.style.transform += " perspective(2000px) rotateY(0deg) scaleX(1) scaleY(1) ";
		
		switch(panel.id){
			case "miniInfoBuyPanel": addFancyClicking.addFancy(panel, 5, 1);
			break;
		}
		
	}, waitTime);
}