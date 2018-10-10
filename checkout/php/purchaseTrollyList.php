<?php


session_start();

if(isset($_SESSION["userId"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	//Retrieve all api from trolly
	$sql = "SELECT * FROM `shoppingTrolly` WHERE `IDUser`=".$_SESSION["userId"];
	
	$result = $conn->query($sql);

	foreach($result as $row){
		//Add to purchase list
		$sql = "INSERT INTO `boughtItems` (ID, UserID, ItemID) VALUES (null, ".$_SESSION["userId"].", ".$row["IDApi"].")";
		$conn->query($sql);
	}

	//Delete all trolly items
	$sql = "DELETE FROM `shoppingTrolly` WHERE `IDUser`=".$_SESSION["userId"];
	$conn->query($sql);
	
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Error 1");
	}

}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("Error 2");
}


?>