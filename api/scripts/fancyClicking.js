function fancyClicker(){
	function calculateClickAngle(clickPos, element){
		var centerOfPanel = {
			x: element.offsetWidth/2,
			y: element.offsetHeight/2
		};


		var sideX = (centerOfPanel.x - (clickPos.clientX));
		var sideY = (centerOfPanel.y - (clickPos.clientY));


		var angle = {
			rads: 0,
			degrees: 0,
		};
		angle.rads = Math.atan2(sideX, sideY);
		angle.degrees = (angle.rads * (180/Math.PI))+180;
	
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

		var sideXMax = Math.abs(centerOfPanel.x - element.offsetWidth);
		var sideYMax = Math.abs(centerOfPanel.y - element.offsetHeight);

		var maxHypothenuse = Math.sqrt(Math.pow(sideXMax, 2)+Math.pow(sideYMax, 2));



		//Returns a click strength of 0-1
		return {
			range: hypothenuse/maxHypothenuse,
			length: hypothenuse,
			xCenter: centerOfPanel.x,
			yCenter: centerOfPanel.y,
		};
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

			//mouseFixed.clientX = mouseFixed.clientX / element.offsetWidth;
			//mouseFixed.clientY = mouseFixed.clientY / element.offsetHeight;

			return mouseFixed;
		}


	this.addFancy = function(p, multiX, multiY){
		var clickStrengthX = 32*multiX;
		var clickStrengthY = 32*multiY;
		p.addEventListener("mousedown", function(e){
			if(e.target.tagName === "BUTTON" && 
				e.target.getAttribute("noFancyClicking") == null){
				var clickpos = getRealMouse(e, p);
				var clickLength = calculateClickStrength(clickpos, p);
				var clickAngle = calculateClickAngle(clickpos, p);

				var verticalForce = Math.cos(clickAngle.rads) * clickLength.length;
				verticalForce /= clickLength.xCenter;

				var horizontalForce = Math.sin(clickAngle.rads) * clickLength.length;
				horizontalForce /= clickLength.yCenter;


				p.style.transformOrigin = "50% 50%";
				//p.style.transform = "rotateY("+(Math.cos(clickAngle.rads)*angleForce)+"deg) rotateX("+(Math.sin(clickAngle.rads)*angleForce)+"deg)";
				p.style.transform = "perspective(1000px) rotateX("+calcDegreeBasedOnSize(verticalForce*clickStrengthX, p)+"deg) rotateY("+calcDegreeBasedOnSize(-horizontalForce*clickStrengthY, p)+"deg)";

				setTimeout(function(){
					normalizePanel(p);
				}, 100);
			}
			
		});

		/*p.addEventListener("mouseup", function(e){
			normalizePanel(p);
		});*/
	}

	function normalizePanel(p){
		p.style.transform = " perspective(2000px) rotateY(0deg) scaleX(1) scaleY(1) ";
	}

	function calcDegreeBasedOnSize(baseDegree, element){
		var rect = element.getBoundingClientRect();
		var ratio = rect.height / rect.width;
		var newGed = baseDegree*ratio;

		return newGed;
	}
}

