<?php  


$limit = 32;
$counter = 0;
foreach($filterResult as $api){
	if($counter > $limit){
		break;
	}
		


	$imgSrc = $api->objectData["ImgName"];

	$apiUrl = $api->objectData["RandomId"];

	if($api->isPackage){
		$apiUrl .= "&p=true";
	}

	echo "<div class='recApiCon' onclick='smartJsLink(\"/StoreFront/api/?id=".$apiUrl."\")'>
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
