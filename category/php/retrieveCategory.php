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


function getRealImageSrc($imgName){
	

	if(strcmp(substr($imgName, -4), ".jpg") == 0){
		return $imgName;
	}else if(strcmp(substr($imgName, -4), ".png") == 0){
		return $imgName;
	}else if(strcmp(substr($imgName, -5), ".jpeg") == 0){
		return $imgName;
	}

	
	if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$imgName.".png")){
		return $imgName.".png";
	}else if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$imgName.".jpg")){
		return $imgName.".jpg";
	}else if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/globalImages/API/".$imgName.".jpeg")){
		return $imgName.".jpeg";
	}

	return $imgName;
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
