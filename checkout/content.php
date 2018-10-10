<?php

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';


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



class apiObject
{
    public $Id = "";
    public $RandomId = "";
    public $Name = "";
    public $Description = "";
    public $Category = "";
    public $Price = "";
    public $imgName = "";
    public $trolleyId = "";
}

if(!isset($_SESSION["userId"])){
	echo "<script>window.open('/StoreFront/home/', '_self')</script>";
	die();
}

//get all item put in trolley
$sql = "SELECT * FROM `shoppingTrolly` WHERE `IDUser`=".$_SESSION["userId"];
$result = $conn->query($sql);


$arrOfApi = array();
foreach($result as $row){
	$sql = "SELECT * FROM `API` WHERE `Id`=".$row["IDApi"];
	$apiResult = $conn->query($sql)->fetch_assoc();


	$newObj = new apiObject;
	$newObj->Id = $apiResult["Id"];
	$newObj->RandomId = $apiResult["RandomId"];
	$newObj->Name = $apiResult["Name"];
	$newObj->Description = $apiResult["Description"];
	$newObj->Category = $apiResult["Category"];
	$newObj->Price = $apiResult["Price"];
	$newObj->imgName = getRealImageSrc($apiResult["ImgName"]);
	$newObj->trolleyId = $row["IDApi"];
	

	array_push($arrOfApi, $newObj);
}


?>

<div class="panel" style="display:block;">
	
	<div id="rowsContainer">
		<?php

		$counter = 0;

			foreach($arrOfApi as $api){
				$classBackgroundUse = "back1";
				if($counter%2==0){
					$classBackgroundUse = "back2";
				}
				echo "<div class='row $classBackgroundUse' id='apiRow".$counter."'>
						<div class='removeApi' onclick='removeApiFromCart($api->trolleyId, \"apiRow$counter\")'>X</div>
						<div class='apiRowTitle'>$api->Name</div>

						<div class='apiRowImage' style='background-image:url(\"/StoreFront/globalImages/API/$api->imgName\")'></div>
						<div class='apiRowDescription'>$api->Description</div>
						<div class='aapiRowCategory'>Category: $api->Category</div>


					</div>";

				$counter++;
			}

		?>
	</div>
	


	<button id="purchaseButton">Purchase</button>
</div>