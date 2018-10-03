define(["apiBoxCreator"], function(apiBoxCreator){
	function initModule(){
		var boxCreator =new apiBoxCreator.init();

		var exampleDatabaseResult3 = [
			{
				name: "Send sms 1",
				description: "Allows you to send sms through Telia's services.",
				price: "10 000kr",
				catagories: "Network, Cellular, Sms",
				image: "https://images.vexels.com/media/users/3/136396/isolated/preview/0feda263cc7046c4f4a224bb70ed0b5f-colorful-message-icon-design-by-vexels.png",
				id: "4713"
			},

			{
				name: "Verify payment",
				description: "Verifies if a user has enough funds to make a purchase.",
				price: "8 500kr",
				catagories: "Payment, Control, Verification",
				image: "https://cdn1.iconfinder.com/data/icons/business-colored-vol-1/100/business-colored-9-01-512.png",
				id: "8574"
			},

			{
				name: "Send voice mail",
				description: "Sends a custom voice message to a phone number.",
				price: "10 000kr",
				catagories: "Cellular, Voice, Phone",
				image: "https://t4.ftcdn.net/jpg/01/14/38/39/240_F_114383977_bW7vvhEQ7SieyFx8gM7mp5hurfUwEuCf.jpg",
				id: "5476"
			},
		];

		var hasLoaded = 0;
		this.loadApisRows = function(apiContainer, category, onLoad){
			ajaxRequest(category, function(data){
				var retrievedData = JSON.parse(data);

				var apiMoveWrapper=document.createElement("div");
				apiMoveWrapper.className = "apiTransitionWrapper";
				
				for(var i=0; i<retrievedData.length; i++){
					boxCreator.createApiBox(apiMoveWrapper, retrievedData[i]);
				}

				apiContainer.appendChild(apiMoveWrapper);

				onLoad(retrievedData.length, apiMoveWrapper);

			}, apiContainer.getAttribute("maximum"));
			

		}


		this.loadApisBoxes = function(apiContainer, category, onLoad){
			ajaxRequest(category, function(data){
				var retrievedData = JSON.parse(data);

				var apiBoxContainer = document.createElement("div");
				apiBoxContainer.className = "simpleBoxContainer";
				
				for(var i=0; i<retrievedData.length; i++){
					boxCreator.createSimpleBox(apiBoxContainer, retrievedData[i]);
				}

				apiContainer.appendChild(apiBoxContainer);

				onLoad(retrievedData.length, apiBoxContainer);

			}, apiContainer.getAttribute("maximum"));


		}




		function ajaxRequest(category, onLoad, limit) {
			limit = (limit == undefined) ? limit = 32 : limit = limit;

			var xhr = new XMLHttpRequest();

			var postData = "category="+category+"&limit="+limit;

			xhr.open("POST", "php/retrieveApi.php", true);

			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			    	//console.log(this.responseText);
			    	onLoad(this.responseText);
			    }
			}
			xhr.send(postData); 



		}



	}return{
		init: initModule
	}
});
