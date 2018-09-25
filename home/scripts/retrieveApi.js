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
				image: "http://www.afraconnect.com/wp-content/uploads/2016/10/sms.png",
				id: "4713"
			},

			{
				name: "Verify payment",
				description: "Verifies if a user has enough funds to make a purchase.",
				price: "8 500kr",
				catagories: "Payment, Control, Verification",
				image: "data:image/png;base64,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",
				id: "8574"
			},

			{
				name: "Send voice mail",
				description: "Sends a custom voice message to a phone number.",
				price: "10 000kr",
				catagories: "Cellular, Voice, Phone",
				image: "https://www.vonage.ca/resources/dotcom/images/features/Voicemail_Plus-d.png?1406231421000",
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