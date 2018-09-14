(function(){
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
		hideAllPanels();
		infoPanel.style.display = "block";
	};

	sandboxButton.onclick = function(){
		hideAllPanels();
		sandboxPanel.style.display = "block";
	};

	commentsButton.onclick = function(){
		hideAllPanels();
		commentPanel.style.display = "block";
	};

	recommendedButton.onclick = function(){
		hideAllPanels();
		recommendPanel.style.display = "block";
	};



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
			panel.style.transform += " perspective(400px) rotateY(0deg) scaleX(1) scaleY(1) ";
			addFancyClicking(panel);
		}, waitTime);
	}


	function addFancyClicking(p){
		p.addEventListener("mousedown", function(e){
			var clickpos = getRealMouse(e, p);
			var clickStrength = calculateClickStrength(clickpos, p);
			var clickAngle = calculateClickAngle(clickpos, p);

			var angleForce = 15*clickStrength;
			p.style.transformOrigin = "50% 50%";
			//p.style.transform = "rotateY("+(Math.cos(clickAngle.rads)*angleForce)+"deg) rotateX("+(Math.sin(clickAngle.rads)*angleForce)+"deg)";
			p.style.transform = "";

		});

		p.addEventListener("mouseup", function(e){
			p.style.transform = "perspective(400px) rotateY(0deg) scaleX(1) scaleY(1)";
		});
	}


	function calculateClickAngle(clickPos, element){
		var centerOfPanel = {
			x: element.offsetWidth/2,
			y: element.offsetHeight/2
		};

		var angle = {
			rads: 0,
			degrees: 0,
		};
		angle.rads = Math.atan2(clickPos.clientY - centerOfPanel.y, clickPos.clientX - centerOfPanel.x);
		angle.degrees = angle.rads * (180/Math.PI);
	
		return angle;
	}

	function calculateClickStrength(clickPos, element){
		var centerOfPanel = {
			x: element.offsetWidth/2,
			y: element.offsetHeight/2
		};

		//Calculate distance between click position and 
		//center of element with pythagoram theorem
		var sideX = Math.abs(centerOfPanel.x - clickPos.clientX);
		var sideY = Math.abs(centerOfPanel.y - clickPos.clientY);

		var hypothenuse = Math.sqrt(Math.pow(sideX, 2)+Math.pow(sideY, 2));


		//Max 

		sideX = Math.abs(centerOfPanel.x - element.offsetWidth);
		sideY = Math.abs(centerOfPanel.y - element.offsetHeight);

		var maxHypothenuse = Math.sqrt(Math.pow(sideX, 2)+Math.pow(sideY, 2));

		//Returns a click strength of 0-1
		return hypothenuse/maxHypothenuse;
	}


	function getRealMouse(e, element){
			var rect = element.getBoundingClientRect();
			var scaleX = element.offsetWidth / rect.width;
			var scaleY = element.offsetHeight / rect.height;


			var mouseFixed = {
				clientX: 0,
				clientX: 0,
			};

			mouseFixed.clientX = (e.clientX - rect.left) * scaleX;
			mouseFixed.clientY = (e.clientY - rect.top) * scaleY;

			mouseFixed.clientX = mouseFixed.clientX / element.offsetWidth;
			mouseFixed.clientY = mouseFixed.clientY / element.offsetHeight;

			return mouseFixed;
		}

})();