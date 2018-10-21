<?php  


$limit = 8;
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

	echo "<div class='recApiCon' onclick='smartJsLink(\"/StoreFront/api/?id=".$api->objectData["RandomId"]."\")'>
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
