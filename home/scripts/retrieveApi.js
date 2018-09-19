define(["apiBoxCreator"], function(apiBoxCreator){
	function initModule(){
		var boxCreator =new apiBoxCreator.init();

		var exampleDatabaseResult = [
			{
				name: "Send sms",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
			{
				name: "Send sms",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
			{
				name: "Send sms",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Apple api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Kiwi api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},

			{
				name: "Orange api",
				description: "Allows you to send sms through Telia's services",
				price: "$99999",
				catagories: "category1, category2, category3",
				image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
				id: "34765"
			},
		];

		this.loadApis = function(apiContainer, category, onLoad){
			
			for(var i=0; i<exampleDatabaseResult.length; i++){
				boxCreator.createApiBox(apiContainer, exampleDatabaseResult[i]);
			}

			onLoad(exampleDatabaseResult.length);

		}



	}return{
		init: initModule
	}
});