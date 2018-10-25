<?php 

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

$isPackage = false;
if(isset($_GET["id"])){
	if(isset($_GET["p"]) && $_GET["p"] == true){
		//we are working with a package
		$isPackage = true;
	}else{
		//we are working with a single api
	}
}else{
	echo "<script>window.open('/StoreFront/home/', '_self')</script>";
	die();
}



if($isPackage == false){
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getInfoFromApi.php';
}else{
	require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getInfoFromPackageApi.php';
}






$purchasebuttonText = "sign in to purchase";

$onClickBuyButtonFunc = "openRegisterPanel()";
if(isset($_SESSION["userId"])){
	$purchasebuttonText = "Add to cart";
	$onClickBuyButtonFunc = "addToCart('".$_GET["id"]."', ".$isPackage.")";
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
				<?php
					if($isPackage == true){
						require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/htmlFromPhp/panelButtonsApiPackage.php';
					}else{
						require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/htmlFromPhp/panelButtonsApi.php';
					}
				?>
				
			</div>
			
			<?php
				if($isPackage == false){
					require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/htmlFromPhp/panelInfo.php';
					require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/htmlFromPhp/panelSandbox.php';
				}else{
					echo "<div id='firstPanel'>";
						require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getIncludedApi/getIncludedAPI.php';
					echo "</div>";
				}
			?>

			
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