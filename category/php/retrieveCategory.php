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
    public $isPackage = false;
}



function getLikesFromAPI($apiId){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$sql = "SELECT * FROM APIlike WHERE `IsLiked`=1 AND `ItemID` = '".htmlspecialchars($apiId)."'";
	$result = $conn->query($sql);
	
	return mysqli_num_rows($result);

}

function getDisLikesFromAPI($apiId){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$sql = "SELECT * FROM APIlike WHERE `IsLiked`=0 AND `ItemID` = '".htmlspecialchars($apiId)."'";
	$result = $conn->query($sql);

	return mysqli_num_rows($result);
}


/*if the user click on header or home the name of category should show only the api of that category */
/*if the user search in the search bar should show the api depening on the keywords in description and name api */

$SpecialCase = false;

if(isset($_POST["cat"])){
	$category = strtolower(htmlspecialchars($_POST["cat"], ENT_QUOTES));
	
	if($category == "most bought"){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/category/php/retriveMostBoughtItem.php';
		$SpecialCase = true;
	}
	elseif($category == "most liked"){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/category/php/retriveMostLikedItem.php';
		$SpecialCase = true;
	}
	else{

	$keyWords = explode(' ', $category);

	//Check for invalid keywords
	for($i=0; $i<count($keyWords); $i++){
		if(!$filter->isValidKeyword($keyWords[$i])){
			$keyWords[$i]  = "";
		}
	}


	//check if you have searched for a category or you have clicked on a category
	$nameCat = "";
	for($i=0; $i<count($keyWords); $i++){
		if ($i > 0) {
			$nameCat .= " ";
			$nameCat .= $keyWords[$i];
		}
		else {
			$nameCat .= $keyWords[$i];
		}
		
	}
	
	if ($nameCat == "top list" or $nameCat == "free" or $nameCat == "sms" or $nameCat == "call" 
	or $nameCat == "for company" or $nameCat == "fun" or $nameCat == "mobile" or $nameCat == "statistics api"
	or $nameCat == "for new started company" or $nameCat == "for industry" or $nameCat == "employer"
	or $nameCat == "management" or $nameCat == "cloud" or $nameCat == "payment" or $nameCat == "combined api") {
		$clicked_category = true;
	}
	else {
		$clicked_category = false;
	}

	//go through every keyword and get all rows associated with them if you search 
	for($i=0; $i<count($keyWords); $i++){
		if(strcmp($keyWords[$i], '') != 0){
			
			if ($nameCat == "all") {
				$sql = "SELECT * FROM API";
			}
			else if ($clicked_category == true) {
				$sql = "SELECT * FROM API WHERE (LOWER(Category) like '%$nameCat%')";
			}
			else {
				$sql = "SELECT * FROM API WHERE (LOWER(Category) like '%$keyWords[$i]%')";
			}
			$result = $conn->query($sql);

			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Category"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						false);
				}
			}
			
			if ($nameCat == "all") {
				$sql = "SELECT * FROM APIpackage";
			}
			else if ($clicked_category == true) {
				$sql = "SELECT * FROM APIpackage WHERE (LOWER(Category) like '%$nameCat%')";
			}
			else {
				$sql = "SELECT * FROM APIpackage WHERE (LOWER(Category) like '%$keyWords[$i]%')";
			}
			$result = $conn->query($sql);
			
			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Category"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						true);
				}
			}

			if ($clicked_category == false) {
			$sql = "SELECT * FROM API  WHERE (LOWER(Description) like '%$keyWords[$i]%')";
			$result = $conn->query($sql);

			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Description"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						false);
				}
			}
			
			
			$sql = "SELECT * FROM APIpackage  WHERE (LOWER(Description) like '%$keyWords[$i]%')";
			$result = $conn->query($sql);

			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Description"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						true);
				}
			}$sql = "SELECT * FROM API  WHERE (LOWER(Name) like '%$keyWords[$i]%')";
			$result = $conn->query($sql);

			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Name"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						false);
				}
			}
			
			$sql = "SELECT * FROM APIpackage  WHERE (LOWER(Name) like '%$keyWords[$i]%')";
			$result = $conn->query($sql);

			if($result){
				foreach($result as $row){
					$filter->addObject($row["Id"], 
						$row, 
						$row["Name"], 
						$keyWords[$i], 
						getLikesFromAPI($row["RandomId"]),
						getDisLikesFromAPI($row["RandomId"]),
						true);
				}
			}
		}
	}

		}
	}

	
	$arrOfApi = array();
	if(!$SpecialCase){
		$filterResult = $filter->getContainer();

		
		foreach($filterResult as $api){
			
			$newObj = new apiObject;
			$newObj->Id = $api->objectData["Id"];
			$newObj->RandomId = $api->objectData["RandomId"];
			$newObj->Name = utf8_encode($api->objectData["Name"]);
			$newObj->Description = utf8_encode($api->objectData["Description"]);
			$newObj->Category = utf8_encode($api->objectData["Category"]);
			$newObj->Price = $api->objectData["Price"];
			$newObj->imgName = utf8_encode($api->objectData["ImgName"]);
			$newObj->relevance = $api->relevance;
			$newObj->isPackage = $api->isPackage;

			array_push($arrOfApi, $newObj);
		}

	}
	echo json_encode($arrOfApi);
}

?>
