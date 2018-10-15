<?php

session_start();
if(isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("You need to log out in order to register a new account.");
}


require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/registerUserClass.php';

$registerManager = new registerUser;





if(isset($_POST["password"]) && isset($_POST["email"])
	&& isset($_POST["firstname"]) && isset($_POST["lastname"])){

	$email = htmlspecialchars($_POST["email"]);
	$password = htmlspecialchars($_POST["password"]);
	$firstname = htmlspecialchars($_POST["firstname"]);
	$lastname = htmlspecialchars($_POST["lastname"]);


	if(!$registerManager->validEmail($email)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("The email is already in use.");
	}

	if(!$registerManager->validPassword($password)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("Password must at least have 6 characters and may only contain letters A to Z, numbers 1 to 9 and _@!#£&");
	}



	

	$registerResult = $registerManager->addNewUser($email, $password, $firstname, $lastname);
	print_r($registerResult);
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

	if(!isset($_POST["firstname"])){
		$errCode .= "first name,";
	}

	if(!isset($_POST["lastname"])){
		$errCode .= "last name ";
	}

	$errCode .= " is invalid.";
	
	echo $errCode;
}


?>