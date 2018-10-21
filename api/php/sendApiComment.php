<?php

session_start();

if(isset($_SESSION["userId"]) && isset($_POST["apiId"]) && isset($_POST["mess"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	$comment = htmlspecialchars($_POST["mess"], ENT_QUOTES);
	$apiId = htmlspecialchars($_POST["apiId"], ENT_QUOTES);
	$postUserId = htmlspecialchars($_SESSION["userId"], ENT_QUOTES);

	//Check if target api id exists
	$sql = "SELECT * FROM `API` WHERE `randomId`='$apiId'";

	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	if(is_null($row)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("Target api doesn't exist");
	}



	//get latest comment order
	//$sql = "SELECT max(`commentOrder`) from `comments` WHERE `APIowner`='$apiId' ORDER BY max(``commentOrder`) desc";





	//Make send message sql
	$today = getdate();
	$d = $today['mday'];
	$m = $today['mon'];
	$y = $today['year'];

	$currentDate = "$y-$m-$d"; 	

	$sql = "INSERT INTO comments (ID, APIowner, userID, comment, date) VALUES
			(null, '$apiId', $postUserId, '$comment', '$currentDate')";


	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("result is false");

	}

	$createdId = $conn->insert_id;

	$returnData = array();
	array_push($returnData, $_SESSION["firstname"]." ".$_SESSION["lastname"]);
	array_push($returnData, $createdId);
	array_push($returnData, $currentDate);

	echo json_encode($returnData);

}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("parameters not all set");
}

?>