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


		/*var exampleDatabaseResult1 = [
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
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8zkrChMUFOjyEeS0SkbxLgR_EAXjraVJWARruoOsGalMbyOzu",
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
		];*/


		/*var exampleDatabaseResult2 = [
			{
				name: "Send sms 1",
				description: "Allows you to send sms through Telia's services.",
				price: "10 000kr",
				catagories: "Network, Cellular, Sms",
				image: "https://images.pexels.com/photos/336948/pexels-photo-336948.jpeg?auto=compress&cs=tinysrgb&h=350",
				id: "4713"
			},

			{
				name: "Verify payment",
				description: "Verifies if a user has enough funds to make a purchase.",
				price: "8 500kr",
				catagories: "Payment, Control, Verification",
				image: "https://media.istockphoto.com/photos/contactless-payment-picture-id537499433?k=6&m=537499433&s=612x612&w=0&h=lhXTrkonpU97FKOc9eCI6M5k5T2-FK_QOGpk6etpM-M=",
				id: "8574"
			},

			{
				name: "Send voice mail",
				description: "Sends a custom voice message to a phone number.",
				price: "10 000kr",
				catagories: "Cellular, Voice, Phone",
				image: "https://us.123rf.com/450wm/georgejmclittle/georgejmclittle1612/georgejmclittle161200138/67866536-close-up-view-of-young-woman-recording-voice-message-on-her-mobile-phone-all-screen-graphics-are-mad.jpg?ver=6",
				id: "5476"
			},
		];*/


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
		this.loadApis = function(apiContainer, category, onLoad){
			var retrievedData;
			if(hasLoaded > 2){
				hasLoaded = 0;
			}
			if(hasLoaded == 0){
				hasLoaded++;
				retrievedData = exampleDatabaseResult3;
			}else if(hasLoaded == 1){ 
				hasLoaded++;
				retrievedData = exampleDatabaseResult3;
			}else if(hasLoaded == 2){ 
				hasLoaded++;
				retrievedData = exampleDatabaseResult3;
			}
			
			var apiMoveWrapper=document.createElement("div");
			apiMoveWrapper.className = "apiTransitionWrapper";
			
			for(var i=0; i<retrievedData.length; i++){
				boxCreator.createApiBox(apiMoveWrapper, retrievedData[i]);
			}

			apiContainer.appendChild(apiMoveWrapper);

			onLoad(retrievedData.length, apiMoveWrapper);

		}



	}return{
		init: initModule
	}
});
