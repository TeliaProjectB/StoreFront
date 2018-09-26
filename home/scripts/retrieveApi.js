define(["apiBoxCreator"], function(apiBoxCreator){
	function initModule(){
		var boxCreator =new apiBoxCreator.init();

		/*var exampleDatabaseResult = [
			{
				name: "Send sms 1",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api 2",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api 3",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api 4",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
			{
				name: "Send sms 5",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api 6",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api 7",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api 8",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
			{
				name: "Send sms 9",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api 10",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api 11",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api 12",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
		];*/


		var exampleDatabaseResult = [
			{
				name: "Send sms 1",
				description: "Allows you to send sms through Telia's services.",
				price: "10 000kr",
				catagories: "Network, Cellular, Sms",
				image: "https://image.freepik.com/free-icon/mobile-phone-text-data-symbol_318-55081.jpg",
				id: "4713"
			},

			{
				name: "Verify payment",
				description: "Verifies if a user has enough funds to make a purchase.",
				price: "8 500kr",
				catagories: "Payment, Control, Verification",
				image: "https://image.freepik.com/free-icon/talking-by-phone-auricular-symbol-with-speech-bubble_318-61564.jpg",
				id: "8574"
			},

			{
				name: "Send voice mail",
				description: "Sends a custom voice message to a phone number.",
				price: "10 000kr",
				catagories: "Cellular, Voice, Phone",
				image: "https://image.freepik.com/free-icon/talking-by-phone-auricular-symbol-with-speech-bubble_318-61564.jpg",
				id: "5476"
			},
		];

		this.loadApis = function(apiContainer, category, onLoad){
			
			var apiMoveWrapper=document.createElement("div");
			apiMoveWrapper.className = "apiTransitionWrapper";
			
			for(var i=0; i<exampleDatabaseResult.length; i++){
				boxCreator.createApiBox(apiMoveWrapper, exampleDatabaseResult[i]);
			}

			apiContainer.appendChild(apiMoveWrapper);

			onLoad(exampleDatabaseResult.length, apiMoveWrapper);

		}



	}return{
		init: initModule
	}
});