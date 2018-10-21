<?php


if(isset($_POST["randomId"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';


	$randomId = htmlspecialchars($_POST["randomId"], ENT_QUOTES);

	$sql = "SELECT `swaggerFile` FROM `API` WHERE `RandomId`='$randomId'";

	$result = $conn->query($sql);
	
	if($result){
		echo $result->fetch_assoc()["swaggerFile"];
		die();
	}


	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 500);

}

header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 500);

?>