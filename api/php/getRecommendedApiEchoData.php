<?php  


$limit = 8;
$counter = 0;
foreach($filterResult as $api){
	if($counter >= $limit){
		break;
	}
		


	$imgSrc = $api->objectData["ImgName"];

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
