<?php  

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/category/php/filterClass.php';

$filter = new filterManager;

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
	
	$keyWords = explode(' ', $category);

	//Check for invalid keywords
	for($i=0; $i<count($keyWords); $i++){
		if(strcmp($keyWords[$i], ' ') == 0){
			$keyWords[$i] = "";
		}else if(strcmp($keyWords[$i], '.') == 0){
			$keyWords[$i] = "";
		}else if(strcmp($keyWords[$i], ',') == 0){
			$keyWords[$i] = "";
		}
	}


	//go through every keyword and get all rows associated with them
	for($i=0; $i<count($keyWords); $i++){
		if(strcmp($keyWords[$i], '') != 0){
			$sql = "SELECT * FROM `API` WHERE LOWER(`Category`) like '%$keyWords[$i]%'";
			$result = $conn->query($sql);
			foreach($result as $row){
				$filter->addObject($row["Id"], $row, $row["Category"], $keyWords[$i]);
			}

			$sql = "SELECT * FROM `API` WHERE LOWER(`Description`) like '%$keyWords[$i]%'";
			$result = $conn->query($sql);
			foreach($result as $row){
				$filter->addObject($row["Id"], $row, $row["Description"], $keyWords[$i]);
			}

			$sql = "SELECT * FROM `API` WHERE LOWER(`Name`) like '%$keyWords[$i]%'";
			$result = $conn->query($sql);
			foreach($result as $row){
				$filter->addObject($row["Id"], $row, $row["Name"], $keyWords[$i]);
			}

		}
	}


	$filterResult = $filter->getContainer();


	$arrOfApi = array();
	foreach($filterResult as $api){
		
		$newObj = new apiObject;
		$newObj->Id = $api->objectData["Id"];
		$newObj->RandomId = $api->objectData["RandomId"];
		$newObj->Name = $api->objectData["Name"];
		$newObj->Description = $api->objectData["Description"];
		$newObj->Category = $api->objectData["Category"];
		$newObj->Price = $api->objectData["Price"];
		$newObj->imgName = getRealImageSrc($api->objectData["ImgName"]);
		$newObj->relevance = $api->relevance;

		array_push($arrOfApi, $newObj);
	}



	echo json_encode($arrOfApi);


}

?>
