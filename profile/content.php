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
		$sql = "SELECT * FROM `APIpackage` WHERE `ID` = $apiId";
		$result = $conn->query($sql);

		return $result->fetch_assoc();
	}


	//Api is a single item
	$sql = "SELECT * FROM `API` WHERE `Id` = $apiId";
	$result = $conn->query($sql);

	return $result->fetch_assoc();

	
}


$infoPanelVisible = "";
$infoPanelMinMax = "maxPanelIcon";

$boughtPanelVisible = "";
$boughtPanelMinMax = "maxPanelIcon";

$paymentPanelVisible = "";
$paymentPanelMinMax = "maxPanelIcon";


if(isset($_GET["index"])){
	if($_GET["index"] == "info"){
		$infoPanelVisible = "style=\"max-height:500px;\"";	
		$infoPanelMinMax = "minPanelIcon";
	}else if($_GET["index"] == "boughtItems"){
		$boughtPanelVisible = "style=\"max-height:500px;\"";
		$boughtPanelMinMax = "minPanelIcon";	
	}else if($_GET["index"] == "payment"){
		$paymentPanelVisible = "style=\"max-height:500px;\"";
		$paymentPanelMinMax = "minPanelIcon";
	}
}
?>

<h1 id="welcomeHeader">
	<?php
		echo "Welcome ".$userFirstName." ".$userLastName;
	?>
</h1>



<div class="panel panelParent">
	<h2 onclick="clickPanelMinMax('panelContentInfo', 'panelMinMax1')" class="panelHeaderTitle">Information <div class="minmaxIcon <?php echo $infoPanelMinMax; ?>" id="panelMinMax1"></h2>

	<div class="panelContent" id="panelContentInfo" name="visible" <?php echo $infoPanelVisible; ?>>

		<div id="panelInfoFlexCon">
			<ul style="display:flex; flex-direction: column;">
				<li>
					<div class="liInfo"><span>First name:</span><button class="editButton" onclick="enableEditing('inputFirstName')"></button></div>
					<input class="userInfoInput normalInput " id="inputFirstName" value="<?php echo $userFirstName; ?>" disabled>
					 
				</li>
				<li>
					<div class="liInfo"><span>Last name: </span><button class="editButton" onclick="enableEditing('inputLastName')"></button></div>
					<input class="userInfoInput normalInput " id="inputLastName" value="<?php echo $userLastName; ?>" disabled>
				</li>
			</ul>

			<ul style="display:flex; flex-direction: column;">
				<li id="passwordPart" style="display:flex; flex-direction: column;">
					<div class="liInfo"><span>Password: </span><button class="editButton" onclick="enablePasswordEditing()"></button></div>
					<span>Current password:</span>
					<input class="userInfoInput normalInput" id="inputCurrentPassword" type="password" value="" style="display:none;">
					</br>
					<span id="newPassSpan" style="display: none;">New password</span>
					<input class="userInfoInput" id="inputPasswordEdit1" type="password" value="123456" disabled>
					<span id="newPassSpanAgain" style="display: none;">New password again</span>
					<input class="userInfoInput normalInput" id="inputPasswordEdit2" type="password" value="123456" disabled style="display:none;">
				</li>


				<li>
					<div class="liInfo"><span>Email:</span></div>
					<input class="userInfoInput normalInput" id="inputEditButton" value="<?php echo $userEmail; ?>" disabled>
					<!--<button class="editButton" onclick="enableEditing('inputEditButton')"></button>-->
				</li>
			</ul>

			
		</div>
		

		<div id="errorMessage"></div>
		<button id="submitEditedInfo" class="strongButton" onclick="sendEditRequest()" style="display: none;">Save</button>
		
	</div>


</div>




<div class="panel panelParent">
	<h2 onclick="clickPanelMinMax('panelContentBought', 'panelMinMax2')" class="panelHeaderTitle">Bought items <div class="minmaxIcon <?php echo $boughtPanelMinMax; ?>" id="panelMinMax2"></div></h2>
	<div class="panelContent"  id="panelContentBought" name="visible" <?php echo $boughtPanelVisible; ?>>
		
		<ul id="boughtListerUl">
			<?php
				$purchaseListEmpty = true;

				foreach ($result as $itemIdRow) {
					$purchaseListEmpty = false;
					$item = getApiFromId($itemIdRow["ItemID"]);
					$apiImageElement = "<div class='apiImageBought' style='background-image: url(\"/StoreFront/globalImages/API/".$item["ImgName"]."\")'></div>";

					$apiTitle = "<div class='liInfo'>".$item["Name"]."</div>";
					$apiDescription = "<div>".$item["Description"]."</div>";
					$titleAndDescription = "<div class='apiBoughtTitleDesc'>".$apiTitle.$apiDescription."</div>";
					if(isset($item["PackageID"])){
						echo "<a href='/StoreFront/apiPackage/?id=".$item["RandomId"]."'><li class='boughtApi'>".$apiImageElement.$titleAndDescription."</li></a>";
					}else{
						echo "<a href='/StoreFront/api/?id=".$item["RandomId"]."'><li class='boughtApi'>".$apiImageElement.$titleAndDescription."</li></a>";
					}
					
				}

				if($purchaseListEmpty){
					echo "<h2>Your purchase list is empty.</h2>";
				}

			?>
		</ul>
	</div>
	
</div>




<div class="panel panelParent">
	<h2 onclick="clickPanelMinMax('panelContentPayment', 'panelMinMax3')" class="panelHeaderTitle">Payment <div class="minmaxIcon <?php echo $paymentPanelMinMax; ?>" id="panelMinMax3"></h2>
	<div class="panelContent" id="panelContentPayment" name="visible" <?php echo $paymentPanelVisible;?> >
		<div style="text-align: center; margin: 32px;">
			<button class="strongButton">Kivra</button>
			<button class="strongButton">Paypal</button>
		</div>
		
	</div>
</div>
