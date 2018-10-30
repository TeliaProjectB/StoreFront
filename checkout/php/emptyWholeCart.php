<?php

session_start();

if(isset($_SESSION["userId"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$apiId = htmlspecialchars($_POST["apiId"], ENT_QUOTES);

	$sql = "DELETE FROM `shoppingTrolly` WHERE `IDUser`=".$_SESSION["userId"];
	try{
		$result = $conn->query($sql);
	}catch(Exception $e){
		echo $e;
	}
	
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Couldn't delete apis from trolly");
	}

}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("All request parameters were not set");
}

?>