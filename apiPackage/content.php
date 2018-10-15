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


$apiName = "";
$apiDescription = "";
$apiImage = "";
$apiCategory = "";
$apiPrice = "";

$randomId = "";

if(isset($_GET["id"])){
	$randomId = htmlspecialchars($_GET["id"]);
	$sql = "SELECT * FROM `APIpackage` WHERE `RandomId`='kj215'";
	$result = $conn->query($sql);


	$row = $result->fetch_assoc();
	$apiName = $row["Name"];
	$apiPackageID = $row["PackageID"];	
	$apiDescription = $row["Description"];
	$apiImage = getRealImageSrc("Call1");
	$apiPrice = $row["Price"];

	if(is_null($apiName)){
		echo "<script>window.open('/StoreFront/home/', '_self')</script>";
		die();
	}
}else{
	echo "<script>window.open('/StoreFront/home/', '_self')</script>";
	die();
}


$onClickBuyButtonFunc = "openRegisterPanel()";
if(isset($_SESSION["userId"])){
	$onClickBuyButtonFunc = "addToCart('".$_GET["id"]."')";
}




//GET Api likes and dislikes
$ThumbsUp = 0;
$ThumbsDown = 0;


$sql = "SELECT * FROM `APIlike` WHERE `ItemID` = '$randomId'";

$result = $conn->query($sql);

foreach($result as $row){
	if($row["IsLiked"] == 1){
		$ThumbsUp++;
	}else{
		$ThumbsDown++;
	}
}

if($ThumbsUp === 0 && $ThumbsDown === 0){
	$ThumbsUpRatio = 0.5;
	$ThumbsDownRatio = 0.5;
}else{
	$ThumbsUpRatio = $ThumbsUp/($ThumbsUp+$ThumbsDown);
	$ThumbsDownRatio = $ThumbsDown/($ThumbsUp+$ThumbsDown);
}





$likeThumbClass = "thumbs";
$disLikeThumbClass = "thumbs";


//Functions forlike dislike click
$likeButtonFunc = "clickLikeApi('".$_GET["id"]."')";
$disLikeButtonFunc = "clickDislikeApi('".$_GET["id"]."')";
if(!isset($_SESSION["userId"])){
	$likeButtonFunc = "openRegisterPanel()";
	$disLikeButtonFunc = "openRegisterPanel()";
}else{
	//check if current user has liked this api
	$apiIsLiked = null;
	$sql = "SELECT * from `APIlike` WHERE `UserID`=".$_SESSION["userId"]." AND `itemID`='$randomId'";
	$result = $conn->query($sql);

	if(!empty($result)){
		$apiIsLiked = $result->fetch_assoc()["IsLiked"];
		
		if(!is_null($apiIsLiked)){
			if($apiIsLiked == 1){
				$likeThumbClass = "pressedThumbs";
			}else if($apiIsLiked == 0){
				$disLikeThumbClass = "pressedThumbs";
			}
		}

		
	}
}


?>


 
<!--Real content start-->
<div id="contentContainer">
	<div id="sideBar">
		<div id="sideBarRealContent">
			<div id="goHomeButtonParent" class="panel panel3d">
				<button id="goHomeButton" onclick="window.open('/StoreFront/home/', '_self');">Go home</button>
			</div>
			<div id="apiIcon" class="panel3d panel" >
				<h1 id="apiIconTitle"><?php echo $apiName; ?></h1>
				<div id="apiIconBackground" style="background-image: url('/StoreFront/globalImages/API/call1.jpg?>')"></div>
			</div>
			<aside id="miniInfoBuyPanel" class="panel3d panel flexColumn">
				<div style="margin-bottom: 16px;"><h4>Last updated:</h4> 2018-02-00</div>
				<div><h4>Price:</h4> <?php echo $apiPrice; ?> kr</div>
				<button id="purchaseButton" onclick="<?php  echo $onClickBuyButtonFunc; ?>">Add to cart</button>
				<div id="thumbsUpDownContainer">
					<div id="thumbsUp" class="<?php echo $likeThumbClass; ?>" onclick="<?php  echo $likeButtonFunc;  ?>"></div>
					<div id="thumbsUpNumber"><?php echo $ThumbsUp; ?></div>
					<div id="thumbsDown" class="<?php echo $disLikeThumbClass; ?>" onclick="<?php  echo $disLikeButtonFunc;  ?>"></div>
					<div id="thumbsDownNumber"><?php echo $ThumbsDown; ?></div>
				</div>

				<div id="thumbsUpRatio">
					<div id="ratioUp" style="flex:<?php echo $ThumbsUpRatio; ?>"></div>
					<div id="ratioDown" style="flex:<?php echo $ThumbsDownRatio; ?>"></div>
				</div>

			</aside>
		</div>				
	</div>
	<div id="CenterContent">
		<article id="info1" class="panel3d panel">
			<h2>Information</h2>
			<p><?php echo $apiDescription; ?></p>
		</article>
		<div id="panelsContainer" class="panel3d panel flexColumn">
			<div id="rowButtonContainer">
				<button class="rowButton panelButtonBackground" id="infoButton">Info</button>
				<button class="rowButton panelButtonBackground"  id="includeButton">Includes</button>
				<button class="rowButton panelButtonBackground"  id="commentsButton">Comment</button>
				<button class="rowButton panelButtonBackground"  id="recommendedButton">Recommended</button>
			</div>
			<div id="infoPanel">
 				<table class="tableInfoBox">
 					<tr>
 						<th>Info</th>
 						<th>Type</th>
					 </tr>
					 <tr>
 						<td>Name</td>
						<td><?php echo $apiName; ?></td>
					</tr>
					<tr>
 						<td>Last update</td>
						<td>2018-09-21</td>
					</tr>
					<tr>
 						<td>Type</td>
						<td>Http, Https</td>
					</tr>
					<tr>
 						<td>License</td>
						<td>Apache License, Version 2.0</td>
					</tr>
					<tr>
 						<td>Host</td>
						<td>hahah.test.com</td>
					</tr>
					<tr>
 						<td>Manual</td>
						<td><a href="www.telia.se/manual?id=47gjew">Telia website manual</a></td>
					</tr>
				</table>
			</div>
			<div id="includePanel">
				<?php
					require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/apiPackage/php/getIncludedAPI.php';
				?>
			</div>
			<div id="commentPanel">
				<div id="commentArea"></div>
			</div>
			<div id="recommendPanel">
				<?php
					/*This code uses apiName, apiDescription to find related7recommended apis*/
					require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getRecommendedApi.php'; 
				?>
			</div>
		</div>
	</div>
</div>
    	<!--Real content end-->
<div id="extraSpace"></div>