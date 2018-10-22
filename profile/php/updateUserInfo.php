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
	$newFirstName = htmlspecialchars($_POST["inputFirstName"], ENT_QUOTES);

	$sql = "UPDATE `user` SET `Firstname`='$newFirstName' WHERE `ID`=".$_SESSION["userId"];
	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Could not update first name.");
	}
	$_SESSION["firstname"] = $newFirstName;
}


if(isset($_POST["inputLastName"])){//Change user last name
	$newLastName = htmlspecialchars($_POST["inputLastName"], ENT_QUOTES);

	$sql = "UPDATE `user`SET `Lastname`='$newLastName' WHERE `ID`=".$_SESSION["userId"];
	$result = $conn->query($sql);
	if(!$result){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Could not update last name.");
	}
	$_SESSION["lastname"] = $newLastName;
}


if(isset($_POST["newPassword"]) && isset($_POST["currentPassword"])){//Change user password
	$newPassword = htmlspecialchars($_POST["newPassword"], ENT_QUOTES);
	$currentPassword = htmlspecialchars($_POST["currentPassword"], ENT_QUOTES);

	//check if current password is correct
	$passwordResult = $signinManager->checkUserFromSQL($_SESSION["email"], $currentPassword);

	if($passwordResult === false){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("cpass");
	}

	//check if new password is a valid password
	if(!$registerManager->validPassword($newPassword)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("npass");
	}
	//Update new password
	if($registerManager->updatePassword($newPassword) === false){
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad request', true, 400);
		die("Error while updating password. Try logging out and in.");
	}
}

?>