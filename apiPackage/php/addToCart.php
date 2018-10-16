<?php
session_start();


if(isset($_SESSION["userId"]) && isset($_POST["apiRandId"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$randomId = htmlspecialchars($_POST["apiRandId"]);

	//get normal id
	$sql = "SELECT `ID`from `APIpackage` WHERE `RandomId`='$randomId'";

	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Api not found");
	}
	$row = $result->fetch_assoc();

	$normalId = $normalId = $row["PackageID"] . "p";


	//Add api to cart
	$sql = "INSERT INTO shoppingTrolly (ID, IDApi, IDUser) VALUES 
			(null, '$normalId', ".$_SESSION['userId'].")";
	$result = $conn->query($sql);

	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Api not found");
	}

	
}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("All request parameters were not set");
}

?>
