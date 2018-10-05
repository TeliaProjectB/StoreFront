<?php

session_start();
if(isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	echo "You need to log out in order to register a new account.";
}


require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/registerUserClass.php';

$registerManager = new registerUser;





if(isset($_POST["name"]) && isset($_POST["password"]) && isset($_POST["email"])
	&& isset($_POST["firstName"]) && isset($_POST["lastName"])){
	$name = htmlspecialchars($_POST["name"]);
	$email = htmlspecialchars($_POST["name"]);
	$password = htmlspecialchars($_POST["password"]);
	$firstName = htmlspecialchars($_POST["firstName"]);
	$lastname = htmlspecialchars($_POST["lastName"]);


	if(!$registerManager->validUsername($name)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("Name is already in use.");
	}

	if(!$registerManager->validEmail($email)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("The email is already in use.");
	}

	if(!$registerManager->validPassword($password)){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("Password must at least have 6 characters and may only contain letters A to Z, numbers 1 to 9 and _@!#£&");
	}



	

	$registerResult = $registerManager->addNewUser($name, $email, $password, $firstName, $lastname);
	if($registerResult != false){
		$userInfo = $registerManager->getInfoFromName($name);
/* Pause this in secound
		$_SESSION["userId"] = $userInfo["ID"];
		$_SESSION["User_name"] = $userInfo["User_name"];
		$_SESSION["firstname"] = $userInfo["firstname"];
		$_SESSION["lastname"] = $userInfo["lastname"];
		*/echo $registerResult;
		
		die("success");
	}else{
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There was an error communicating with the server whild registering.");
	}

	//echo password_verify($password, $userPasswordHash);

}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	$errCode = "Error: ";
	if(!isset($_POST["name"])){
		$errCode .= "name, ";
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