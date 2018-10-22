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
	$randomId = htmlspecialchars($_GET["id"], ENT_QUOTES);
	$sql = "SELECT * FROM `API` WHERE `RandomId`='$randomId'";
	$result = $conn->query($sql);


	$row = $result->fetch_assoc();
	$apiName = $row["Name"];
	$apiDescription = $row["Description"];
	$apiImage = getRealImageSrc($row["ImgName"]);
	$apiCategory = $row["Category"];
	$apiPrice = $row["Price"];

	if(is_null($apiName)){
		echo "<script>window.open('/StoreFront/home/', '_self')</script>";
		die();
	}
}else{
	echo "<script>window.open('/StoreFront/home/', '_self')</script>";
	die();
}


$apiDescription = str_replace("\n", "</br>", $apiDescription);

$purchasebuttonText = "sign in to purchase";

$onClickBuyButtonFunc = "openRegisterPanel()";
if(isset($_SESSION["userId"])){
	$purchasebuttonText = "Add to cart";
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



//Get the number of comments on this api and add it to the indicator
$thisId = htmlspecialchars($_GET["id"], ENT_QUOTES);
$sql = "SELECT * from `comments` WHERE `APIowner`='$thisId'";
$result = $conn->query($sql);
$numberOfComments = mysqli_num_rows($result);



require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getRecommendedApiGetData.php'; 
?>


 
<!--Real content start-->
<div id="contentContainer">
	<div id="sideBar">
		<div id="sideBarRealContent">
			<div id="goHomeButtonParent" class="panel panel3d">
				<button id="goHomeButton" onclick="window.open('/StoreFront/home/', '_self');">Home</button>
			</div>
			<div id="apiIcon" class="panel3d panel" >
				<h1 id="apiIconTitle"><?php echo $apiName; ?></h1>
				<div id="apiIconBackground" style="background-image: url('/StoreFront/globalImages/API/<?php echo $apiImage; ?>')"></div>
			</div>
			<aside id="miniInfoBuyPanel" class="panel3d panel flexColumn">
				<div class="infoBuyPanelText"><h4>Price:</h4> <?php echo $apiPrice; ?> kr</div>
				<button id="purchaseButton" class="strongButton" onclick="<?php  echo $onClickBuyButtonFunc; ?>"><?php echo $purchasebuttonText; ?></button>
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
				<button class="rowButton panelButtonBackground"  id="sandboxButton">Sandbox</button>
				<button class="rowButton panelButtonBackground"  id="commentsButton">
					<div id="panelNumber">
					<?php echo $numberOfComments; ?>
					</div>Comments 
				</button>
				<button class="rowButton panelButtonBackground"  id="recommendedButton">
				<div id="panelNumber">
					<?php echo count($filterResult); ?>
				</div>Recommended
			</button>
			</div>
			<div id="infoPanel">
 				<table class="tableInfoBox">
					<tr>
						<td>Category</td>
						<td><?php echo $apiCategory; ?></td>
					</tr>
					<tr>
						<td>Version</td>
						<td><span id="apiVersionInfo"></span></td>
					</tr>
					<tr>
 						<td>Type</td>
						<td id="apiTypeInfo"></td>
					</tr>
					<tr>
 						<td>Host</td>
						<td id="apiHostInfo"></td>
					</tr>
					<tr>
 						<td>Api description</td>
						<td id="apiSwagDescInfo"></td>
					</tr>
				</table>

				<!--
				<p>
					Name: Apple API
					<br>
					Example request urls:
					<br>
					Request apple: apple.com/request/?type=apple&number=5
					<br>
					Returns an Apple JSON.
				</p>
				-->
			</div>
			<div id="sandboxPanel">
				<!--<div id="sandboxArea"></div>-->
				
				<div style="display:flex; flex-direction: row;">

					<div>
						<div id="swaggerMinimize"></div>
						<div id="fileSystemContainer">
							<span id="fileSystemTitle">Functions:</span>
							<div style="display:block;" id="fileSystem"></div>
						</div>
					</div>
						
					<div id="swaggerPatchInfo">
						<p style="display:block;" id="apiSandboxInfo">
							API(Application Programming Interface) gives you a way tocommunicate another program, service or database. They can have one or multiple functions that take in multipleparameters. Here you can try out different functions of this API. open a folder in the functions explorer and select a function.							
						</p>
						<div id="sandboxArrowLeft"></div>
					</div>
					
				</div>

			</div>
			<div id="commentPanel">
				<div id="commentArea"></div>
			</div>
			<div id="recommendPanel">
				<?php
					/*This code uses apiName, apiDescription to find related7recommended apis*/
					require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getRecommendedApiEchoData.php'; 
				?>
			</div>
		</div>
	</div>
</div>
    	<!--Real content end-->
<div id="extraSpace"></div>