define(["apiBoxCreator"], function(apiBoxCreator){
	function initModule(){
		var boxCreator =new apiBoxCreator.init();

		var exampleDatabaseResult = [
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