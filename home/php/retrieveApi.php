<?php

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';





class apiObject
{
    public $Id = "";
    public $RandomId = "";
    public $Name = "";
    public $Description = "";
    public $Category = "";
    public $Price = "";
    public $imgName = "";
}


if(isset($_POST["category"]) && isset($_POST["limit"])){
	$category = strtolower(htmlspecialchars($_POST["category"], ENT_QUOTES));
	$limit = htmlspecialchars($_POST["limit"], ENT_QUOTES);

	if ($category == "all") {
		$sql = "SELECT * FROM `API`";
	}
	else {
		$sql = "SELECT * FROM `API` WHERE LOWER(`Category`) like '%$category%'";
	}
	
	$result = $conn->query($sql);


	$arrOfApi = array();
	foreach($result as $row){
		if(sizeof($arrOfApi) >= $limit && $limit != -1){
			break;
		}
		$newObj = new apiObject;
		$newObj->Id = $row["Id"];
		$newObj->RandomId = $row["RandomId"];
		$newObj->Name = utf8_encode($row["Name"]);
		$newObj->Description = utf8_encode($row["Description"]);
		$newObj->Category = utf8_encode($row["Category"]);
		$newObj->Price = $row["Price"];
		$newObj->imgName = utf8_encode($row["ImgName"]);

		array_push($arrOfApi, $newObj);
	}



	echo json_encode($arrOfApi);


}


?>
