<?php  

require_once $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
require_once $_SERVER["DOCUMENT_ROOT"].'/StoreFront/category/php/filterClass.php';

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


function getLikesFromAPI($apiId){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$sql = "SELECT * FROM APIlike WHERE `IsLiked`=1 AND `ItemID` = '".htmlspecialchars($apiId, ENT_QUOTES)."'";
	$result = $conn->query($sql);
	
	return mysqli_num_rows($result);

}

function getDisLikesFromAPI($apiId){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	$sql = "SELECT * FROM APIlike WHERE `IsLiked`=0 AND `ItemID` = '".htmlspecialchars($apiId, ENT_QUOTES)."'";
	$result = $conn->query($sql);

	return mysqli_num_rows($result);
}




$keysString = $apiName." ".$apiDescription;

$category = strtolower(htmlspecialchars($keysString, ENT_QUOTES));
	
$keyWords = explode(' ', $category);





//Check for invalid keywords
for($i=0; $i<count($keyWords); $i++){
	if(!$filter->isValidKeyword($keyWords[$i])){
		$keyWords[$i] = "";
	}
}



if(count($keyWords) >  3){
	$limitedKeys = array();
	array_push($limitedKeys, $keyWords[0], $keyWords[1]);
}





//go through every keyword and get all rows associated with them
for($i=0; $i<count($limitedKeys); $i++){
	if(strcmp($limitedKeys[$i], '') != 0){

		$sql = "SELECT * FROM API  WHERE (LOWER(Description) 
		like '%".$limitedKeys[$i]."%')";
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				if($apiName == $row["Name"]){
					break;
				}
				
				$PassId = $row["Id"];
				if(isset($row["PackageID"])){
					$PassId = $PassId."p";
				}
				$filter->addObject($PassId, 
					$row, 
					$row["Description"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					false);
			}
		}


		$sql = "SELECT * FROM APIpackage  WHERE (LOWER(Description) 
		like '%".$limitedKeys[$i]."%')";
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				if($apiName == $row["Name"]){
					break;
				}
				
				$PassId = $row["Id"]."p";
				$filter->addObject($PassId, 
					$row, 
					$row["Description"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					true);
			}
		}




		$sql = "SELECT * FROM API  WHERE (LOWER(Category) 
		like '%".$limitedKeys[$i]."%')";
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				if($apiName == $row["Name"]){
					break;
				}
				
				$PassId = $row["Id"];
				if(isset($row["PackageID"])){
					$PassId = $PassId."p";
				}
				$filter->addObject($PassId, 
					$row, 
					$row["Category"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					false);
			}
		}


		$sql = "SELECT * FROM APIpackage  WHERE (LOWER(Category) 
		like '%".$limitedKeys[$i]."%')";
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				if($apiName == $row["Name"]){
					break;
				}
				
				$PassId = $row["Id"]."p";
				$filter->addObject($PassId, 
					$row, 
					$row["Category"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					true);
			}
		}



		/*$sql = "SELECT * FROM API, APIpackage  WHERE (LOWER(API.Name) 
		like '%$limitedKeys[$i]%' OR LOWER(APIpackage.Name) like '%$limitedKeys[$i]%')";
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				if($row["Name"] == $apiName){
					break;
				}

				$PassId = $row["Id"];
				if(isset($row["PackageID"])){
					$PassId = $PassId."p";
				}
				$filter->addObject($PassId, 
					$row, 
					$row["Category"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					isset($row["PackageID"]));
			}
		}*/


		/*$sql = "SELECT * FROM api, apipackage  WHERE (LOWER(api.Name) 
		like '%$limitedKeys[$i]%' OR LOWER(apipackage.Name) like '%$keyWords[$i]%')";
		echo $sql;
		$result = $conn->query($sql);
		if($result){
			foreach($result as $row){
				$PassId = $row["Id"];
				if(isset($row["PackageID"])){
					$PassId = $PassId."p";
				}

				$filter->addObject($PassId, 
					$row, 
					$row["Category"], 
					$keyWords[$i], 
					getLikesFromAPI($row["RandomId"]),
					getDisLikesFromAPI($row["RandomId"]),
					isset($row["PackageID"]));
			}
		}*/

	}
}


$filterResult = $filter->getContainer();

$limit = 4;
$counter = 0;
foreach($filterResult as $api){
	if($counter >= $limit){
		break;
	}
		
	/*$newObj = new apiObject;
	$newObj->Id = $api->objectData["Id"];
	$newObj->RandomId = $api->objectData["RandomId"];
	$newObj->Name = $api->objectData["Name"];
	$newObj->Description = $api->objectData["Description"];
	$newObj->Category = $api->objectData["Category"];
	$newObj->Price = $api->objectData["Price"];
	$newObj->imgName = getRealImageSrc($api->objectData["ImgName"]);
	$newObj->relevance = $api->relevance;*/

	$imgSrc = getRealImageSrc($api->objectData["ImgName"]);

	echo "<div class='recApiCon' onclick='window.open(\"/StoreFront/api/?id=".$api->objectData["RandomId"]."\", \"_self\")'>
			<div class='recApiTitle'>".$api->objectData["Name"]."</div>
			<div class='recImgTxtCon'>
				<div class='recApiImage' style='background-image:url(\" /StoreFront/globalImages/API/$imgSrc\")'></div>
				<div class='recApiText'>".$api->objectData["Description"]."</div>
			</div>
			<div class='recApiPrice'>".$api->objectData["Price"]." kr</div>
		</div>";

	$counter++;
}






?>
