<?php

session_start();
if(isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("You need to log out in order to register a new account.");
}


require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/registerUserClass.php';

$registerManager = new registerUser;





if(isset(isset($_POST["password"]) && isset($_POST["email"])
	&& isset($_POST["firstName"]) && isset($_POST["lastName"])){

	$email = htmlspecialchars($_POST["email"]);
	$password = htmlspecialchars($_POST["password"]);
	$firstName = htmlspecialchars($_POST["firstName"]);
	$lastname = htmlspecialchars($_POST["lastName"]);


	if(!$registerManager->validEmail($email)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("The email is already in use.");
	}

	if(!$registerManager->validPassword($password)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("Password must at least have 6 characters and may only contain letters A to Z, numbers 1 to 9 and _@!#£&");
	}



	

	$registerResult = $registerManager->addNewUser($email, $password, $firstName, $lastname);
	if($registerResult != false){
		$userInfo = $registerManager->getInfoFromName($email);
		// Pause this in secound
		$_SESSION["userId"] = $userInfo["ID"];
		$_SESSION["email"] = $userInfo["Email"];
		$_SESSION["firstname"] = $userInfo["Firstname"];
		$_SESSION["lastname"] = $userInfo["Lastname"];
		//echo $registerResult;
		
		die("success");
	}else{
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There was an error communicating with the server whild registering.");
	}

	//echo password_verify($password, $userPasswordHash);

}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	$errCode = "Error: ";
	if(!isset($_POST["email"])){
		$errCode .= "email, ";
	}

	if(!isset($_POST["password"])){
		$errCode .= "password, ";
	}

	if(!isset($_POST["firstName"])){
		$errCode .= "first name,";
	}

	if(!isset($_POST["lastName"])){
		$errCode .= "last name ";
	}

	$errCode .= " is invalid.";
	
	echo $errCode;
}


?>