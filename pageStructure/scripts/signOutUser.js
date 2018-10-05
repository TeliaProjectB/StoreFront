function userSignOut(){
	ajaxRequestSignIn("/StoreFront/pageStructure/php/signUserOut.php", "", function(){
		window.open("/StoreFront/home", "_self");
	});
}