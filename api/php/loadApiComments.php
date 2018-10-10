<?php


class apiObject
{
    public $order = "";
    public $message = "";
    public $date = "";
    public $name = "";
}



if(isset($_POST["apiId"]) && isset($_POST["offset"]) && isset($_POST["from"])){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	$apiId = htmlspecialchars($_POST["apiId"]);
	$offset = htmlspecialchars($_POST["offset"]);
	$from = htmlspecialchars($_POST["from"]);
	$limit = 10;

	$sql = "SELECT * from `comments` WHERE `APIowner`='$apiId'";
	$result = $conn->query($sql);
	$numerOfApiComments = mysqli_num_rows($result);

	//Make selections
	if($from > 0){
		$sql = "SELECT * from `comments` WHERE `APIowner`='$apiId' AND `ID`>$from ORDER BY ID DESC";
	}else{
		$sql = "SELECT * from `comments` WHERE `APIowner`='$apiId' AND `ID`>$from ORDER BY ID DESC LIMIT $offset, $limit";
	}
	
	//echo $sql;
	$result = $conn->query($sql);
	if($result === false){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There are no messages for this API");
	}
	if(mysqli_num_rows ($result) == 0){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There are no messages for this API");
	}

	$skippedOffset = 0;
	$arrOfComments = array();
	foreach($result as $row){
		if(is_null($row["ID"])){
			break;
		}

		$newObj = new apiObject;
		$newObj->order = $row["ID"];
		$newObj->message = $row["Comment"];
		$newObj->date = $row["Date"];

		$commentUserId = $row["UserID"];
		if(is_null($commentUserId)){
			break;
		}
		//get users current name from id
		$sql = "SELECT `User_name` from user WHERE `ID`=$commentUserId";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		$newObj->name = $row["User_name"];

		array_push($arrOfComments, $newObj);
	}

	$arrOfComments = array_reverse($arrOfComments);

	echo json_encode($arrOfComments);


}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("Target api doesn't exist");
}

?>