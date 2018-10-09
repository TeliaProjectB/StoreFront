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
    public $ImgName = "";
}


function getRealImageSrc($ImgName){
	

	if(strcmp(substr($ImgName, -4), ".jpg") == 0){
		return $ImgName;
	}else if(strcmp(substr($ImgName, -4), ".png") == 0){
		return $ImgName;
	}else if(strcmp(substr($ImgName, -5), ".jpeg") == 0){
		return $ImgName;
	}

	
	if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$ImgName.".png")){
		return $ImgName.".png";
	}else if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$ImgName.".jpg")){
		return $ImgName.".jpg";
	}else if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$ImgName.".jpeg")){
		return $ImgName.".jpeg";
	}

	return $ImgName;
}

if(isset($_POST["cat"])){
	$category = strtolower(htmlspecialchars($_POST["cat"]));
	


	$sql = "SELECT * FROM `API` WHERE LOWER(`Category`) like '%$category%'";

	
	$result = $conn->query($sql);


	$arrOfApi = array();
	foreach($result as $row){
		
		$newObj = new apiObject;
		$newObj->Id = $row["Id"];
		$newObj->RandomId = $row["RandomId"];
		$newObj->Name = $row["Name"];
		$newObj->Description = $row["Description"];
		$newObj->Category = $row["Category"];
		$newObj->Price = $row["Price"];
		$newObj->ImgName = getRealImageSrc($row["ImgName"]);

		array_push($arrOfApi, $newObj);
	}



	echo json_encode($arrOfApi);


}

?>
