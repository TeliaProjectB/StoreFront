<?php

session_start();


if(!isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("You need to be logged in to like APIs");
}


if(isset($_POST["likeIt"]) && isset($_POST["apiRandId"])){
	$isLiked = htmlspecialchars($_POST["likeIt"]);
	$randApiId = htmlspecialchars($_POST["apiRandId"]);
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';


	//check if user already has liked or disliked
	$sql = "SELECT * FROM `APIlike` WHERE `UserId`='".$_SESSION["userId"]."'";
	$result = $conn->query($sql);
	$previousLikeStatus = -1;
	if($result){
		$previousLikeStatus = $result->fetch_assoc()["IsLiked"];
	}

	//Delete all oldlike and dislikes from this user to this api
	$sql = "DELETE from `APIlike` WHERE `ItemID`='$randApiId' AND `UserId`='".$_SESSION["userId"]."'";
	$conn->query($sql);


	//If previous selected like status is equal to requested like status, the user wants it undone.
	if($previousLikeStatus != $isLiked){
		//Add new dislike or like
		$sql = "INSERT INTO `APIlike` (ID, ItemID, UserId, IsLiked) VALUES 
			(null, '$randApiId', ".$_SESSION["userId"].", $isLiked)";

		$conn->query($sql);

		echo $isLiked;
	}
	
	

	


}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("No  like or disliked selected");
}




?>
