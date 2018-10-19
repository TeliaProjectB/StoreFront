<?php

session_start();

require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/signinUserClass.php';
$signinManager = new signinUser;

require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/registerUserClass.php';
$registerManager = new registerUser;

if(!isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
	die("You are not logged in");
}


if(isset($_POST["inputFirstName"])){//Change user first name
	$newFirstName = htmlspecialchars($_POST["inputFirstName"]);

	$sql = "UPDATE `user`SET `Firstname`='$newFirstName' WHERE `ID`=".$_SESSION["userId"];
	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Could not update first name.");
	}
}


if(isset($_POST["inputLastName"])){//Change user last name
	$newLastName = htmlspecialchars($_POST["inputLastName"]);

	$sql = "UPDATE `user`SET `Last`='$newLastName' WHERE `ID`=".$_SESSION["userId"];
	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Could not update last name.");
	}
}


if(isset($_POST["newPassword"]) && isset($_POST["currentPassword"])){//Change user password
	$newPassword = htmlspecialchars($_POST["newPassword"]);
	$currentPassword = htmlspecialchars($_POST["currentPassword"]);

	//check if current password is correct
	$passwordResult = $signinManager->checkUserFromSQL($_SESSION["email"], $currentPassword);

	if($passwordResult === false){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Current password input is incorrect");
	}

	//check if new password is a valid password
	if(!$registerManager->validPassword($newPassword)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("New password must at least have 6 characters and may only contain letters A to Z, numbers 1 to 9 and _@!#£&");
	}
	//Update new password
	if($registerManager->updatePassword($newPassword) === false){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Error while updating password. Try logging out and in.");
	}
}

?>