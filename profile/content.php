<?php

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';


if(!isset($_SESSION["userId"])){
	echo "<script>window.open('/StoreFront/', '_SELF');</script>";
	die();
}



//get logged users data
$sql = "SELECT * FROM `user` WHERE `ID` = ".$_SESSION["userId"];
$result = $conn->query($sql);
$userData = $result->fetch_assoc();

//Print welcome title
$userFirstName = $userData["Firstname"];
$userLastName = $userData["Lastname"];
$userEmail = $userData["Email"];




//Get all bought items
$sql = "SELECT * FROM `boughtItems` WHERE `UserID` = '".$_SESSION["userId"]."'";
$result = $conn->query($sql);




function getApiFromId($apiId){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

	if (strpos($apiId, 'p') !== false) {
		$apiId = str_replace("p", "", $apiId);
		//Api id is from a package
		$sql = "SELECT * FROM `APIpackage` WHERE `PackageID` = $apiId";
		$result = $conn->query($sql);

		return $result->fetch_assoc();
	}


	//Api is a single item
	$sql = "SELECT * FROM `API` WHERE `Id` = $apiId";
	$result = $conn->query($sql);

	return $result->fetch_assoc();

	
}


$hideInfoPanel = "style=\"max-height:0px;\"";
$infoPanelMinMax = "maxPanelIcon";

$hideBoughtPanel = "style=\"max-height:0px;\"";
$boughtPanelMinMax = "maxPanelIcon";

$hidePaymentPanel = "style=\"max-height:0px;\"";
$paymentPanelMinMax = "maxPanelIcon";


if(isset($_GET["index"])){
	if($_GET["index"] == "info"){
		$hideInfoPanel = "";
		$infoPanelMinMax = "minPanelIcon";
	}else if($_GET["index"] == "boughtItems"){
		$hideBoughtPanel = "";
		$boughtPanelMinMax = "minPanelIcon";	
	}else if($_GET["index"] == "payment"){
		$hidePaymentPanel = "";
		$paymentPanelMinMax = "minPanelIcon";
	}
}
?>

<h2 id="welcomeHeader">
	<?php
		echo "Welcome ".$userFirstName." ".$userLastName;
	?>
</h2>



<div class="panel panelParent" >
	<h2 onclick="clickPanelMinMax('firstPanelInfo', 'panelMinMax1')" class="panelHeaderTitle">Information <div class="minmaxIcon <?php echo $infoPanelMinMax; ?>" id="panelMinMax1"></h2>

	<div id="firstPanelInfo" class="panelResize" <?php echo $hideInfoPanel;?> >
		<div class="panelContent" id="panelContentInfo">

			<div id="panelInfoFlexCon">
				<ul class="profileUl" style="display:flex; flex-direction: column;">
					<li class="profileLi">
						<div class="liInfo"><span>First name:</span><button class="editButton" onclick="enableEditing('inputFirstName')"></button></div>
						<input class="userInfoInput normalInput " id="inputFirstName" value="<?php echo $userFirstName; ?>" disabled>
						 
					</li>
					<li class="profileLi">
						<div class="liInfo"><span>Last name: </span><button class="editButton" onclick="enableEditing('inputLastName')"></button></div>
						<input class="userInfoInput normalInput " id="inputLastName" value="<?php echo $userLastName; ?>" disabled>
					</li>
				</ul>

				<ul class="profileUl" style="display:flex; flex-direction: column;">
					
					<li class="profileLi">
						<div class="liInfo">
							<span>Email:</span>
							<button class="editButton" onclick="enableEditing('inputEmailEdit')"></button>
						</div>
						<input class="userInfoInput normalInput" id="inputEmailEdit" value="<?php echo $userEmail; ?>" disabled>
					</li>


					<li class="profileLi" id="passwordPart" style="display:flex; flex-direction: column;">
						<div class="liInfo"><span>Password: </span><button class="editButton" onclick="enablePasswordEditing()"></button></div>
						<input class="userInfoInput normalInput" id="inputCurrentPassword" type="password" value="" placeholder="Current password" style="display: none;">
						
						</br>
						<span id="newPassSpan" style="display: none;">New password</span>
						<input class="userInfoInput" id="inputPasswordEdit1" type="password" value="123456" disabled>
						<span id="newPassSpanAgain" style="display: none;">New password again</span>
						<input class="userInfoInput normalInput" id="inputPasswordEdit2" type="password" value="" disabled style="display:none;">
					</li>


					
				</ul>

				
			</div>
			

			<div id="errorMessage"></div>
			<button id="submitEditedInfo" class="strongButton" onclick="sendEditRequest()" style="display: none;">Save</button>
			
		</div>
	</div>
	


</div>




<div class="panel panelParent">
	<h2 onclick="clickPanelMinMax('secondPanelBought', 'panelMinMax2')" class="panelHeaderTitle">Bought items <div class="minmaxIcon <?php echo $boughtPanelMinMax; ?>" id="panelMinMax2"></div></h2>
	
	<div id="secondPanelBought" class="panelResize" <?php echo $hideBoughtPanel;?>>
		<div class="panelContent"  id="panelContentBought" >
			
			<ul class="profileUl" id="boughtListerUl">
				<?php
					$purchaseListEmpty = true;

					foreach ($result as $itemIdRow) {
						$purchaseListEmpty = false;
						$item = getApiFromId($itemIdRow["ItemID"]);

						$linkUrl = "/StoreFront/api/?id=".$item["RandomId"];

						//check if we are dealing with an api package
						if(isset($item["PackageID"])){
							$linkUrl = "/StoreFront/api/?id=".$item["RandomId"]."&p=true";
						}

						$apiImageElement = "<div class='apiImageBought' style='background-image: url(\"/StoreFront/globalImages/API/".$item["ImgName"]."\")'></div>";

						$apiTitle = "<div class='liInfo'>".$item["Name"]."</div>";
						$apiDescription = "<div>".$item["Description"]."</div>";
						$titleAndDescription = "<div class='apiBoughtTitleDesc'>".$apiTitle.$apiDescription."</div>";
						echo "<a class='linkBought' href='".$linkUrl."'><li class='boughtApi'>".$apiImageElement.$titleAndDescription."</li></a>";
						
					}

					if($purchaseListEmpty){
						echo "<div style='text-align: center; margin: 16px;'><h3 style='padding-top:2px'>Your purchase list is empty.</h3></div>";
					}

				?>
			</ul>
		</div>
	</div>
	
</div>




<div class="panel panelParent">
	<h2 onclick="clickPanelMinMax('thirdPanelPayment', 'panelMinMax3')" class="panelHeaderTitle">Payment <div class="minmaxIcon <?php echo $paymentPanelMinMax; ?>" id="panelMinMax3"></h2>
	
	<div id="thirdPanelPayment" class="panelResize" <?php echo $hidePaymentPanel;?>>
		<div class="panelContent" id="panelContentPayment"  >
			<div style="text-align: center; padding: 32px;">
				<button class="strongButton" style="font-size: 20px;">Klarna</button>
				<button class="strongButton" style="font-size: 20px;">Paypal</button>
			</div>
			
		</div>
	</div>
</div>


<!-- Add extra space -->
<div style="height: 256px;"></div>
