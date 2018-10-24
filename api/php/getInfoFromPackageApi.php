<?php







$randomId = htmlspecialchars($_GET["id"], ENT_QUOTES);
$sql = "SELECT * FROM `APIpackage` WHERE `RandomId`='$randomId'";
$result = $conn->query($sql);


$row = $result->fetch_assoc();
$apiName = $row["Name"];
$apiPackageID = $row["PackageID"];	
$apiDescription = $row["Description"];
$apiImage = $row["ImgName"];
$apiCategory = $row["Category"];
$apiPrice = $row["Price"];

//If target apipackage doesn't exist o tohome page
if(is_null($apiName)){
	echo "<script>window.open('/StoreFront/home/', '_self')</script>";
	die();
}


$apiDescription = str_replace("\n", "</br>", $apiDescription);





?>