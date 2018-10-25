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
		public $isPackage = "";
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
		$newObj = new apiObject;

		if (strpos($row["IDApi"], 'p')) {

			$refinedID = substr($row["IDApi"], 0, -1);

			$sql = "SELECT * FROM `APIpackage` WHERE `PackageID`=".$refinedID;
			$apiResult = $conn->query($sql)->fetch_assoc();
	
			$newObj->Id = $apiResult["Id"];
			$newObj->RandomId = $apiResult["RandomId"];
			$newObj->Name = $apiResult["Name"];
			$newObj->Description = $apiResult["Description"];
			$newObj->Category = "Cobination";
			$newObj->Price = $apiResult["Price"];
			$newObj->imgName = getRealImageSrc($apiResult["ImgName"]);
			$newObj->trolleyId = $row["IDApi"];
			$newObj->isPackage = true;
		}
		else{
			$sql = "SELECT * FROM `API` WHERE `Id`=".$row["IDApi"];
			$apiResult = $conn->query($sql)->fetch_assoc();
	
	
			$newObj->Id = $apiResult["Id"];
			$newObj->RandomId = $apiResult["RandomId"];
			$newObj->Name = $apiResult["Name"];
			$newObj->Description = $apiResult["Description"];
			$newObj->Category = $apiResult["Category"];
			$newObj->Price = $apiResult["Price"];
			$newObj->imgName = getRealImageSrc($apiResult["ImgName"]);
			$newObj->trolleyId = $row["IDApi"];
			$newObj->isPackage = false;
		}
		array_push($arrOfApi, $newObj);
	}
	

?>

<div class="panel" id="checkOutContent" >
	<h1 id="checkoutHeader" >Checkout</h1>
	<div id="rowsContainer">
		<?php

		$counter = 0;
		$totalAmount = 0;

			foreach($arrOfApi as $api){
				$classBackgroundUse = "back1";
				if($counter%2==0){
					$classBackgroundUse = "back2";
				}
				$url = "/StoreFront/api/?id=".$api->RandomId;
				if($api->isPackage) {
					$url .= "&p=true";
				}

				echo "<div class='row $classBackgroundUse' id='apiRow".$counter."'>
						<div class='removeApi' onclick='removeApiFromCart(\"$api->trolleyId\", \"apiRow$counter\")'></div>
						<div class='rowTitleCon'>
							<a href='$url' class='apiRowTitle'>$api->Name</a>
						</div>
						

						<div class='imgDescCon'>
							<div class='apiRowImage' style='background-image:url(\"/StoreFront/globalImages/API/$api->imgName\")'></div>
							<div class='apiRowDescription'>$api->Description</div>
						</div>
						
						<div class='apiRowCategory'>Category: $api->Category</div>
						<div class='apiRowPrice'>$api->Price Kronor</div>


					</div>";
				$api->Price = str_replace(" ","",$api->Price);
				$totalAmount += $api->Price;
				$counter++;
			}

			if($counter == 0){
				echo "<div class='apiRowTitle'>Your shopping cart is empty. Go play with some API!</div>";
			}

		?>
	</div>
	

	<div id="priceAmount"><?php
	
		echo "Total amount: ".$totalAmount." kronor.";
	?></div>

	<?php

		if($counter != 0){
			echo '<button id="purchaseButton" class="strongButton" onclick="purchase()">Purchase</button>';
		}
	?>
	
</div>