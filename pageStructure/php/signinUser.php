<?php


session_start();
if(isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("You are already logged in.");
}

require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/signinUserClass.php';

$signinManager = new signinUser;


if(isset($_POST["email"]) && isset($_POST["password"])){
    $email = htmlspecialchars($_POST["email"]);
    $pass = $_POST["password"];
    

    $registerResult = $signinManager->checkUserFromSQL($email, $pass);

    if( $registerResult  ===  true){
    	echo "true";
    }else if( $registerResult  ===  false){
    	echo "false";
    }


    echo "\n";
	if($registerResult === true){
		$userInfo = $signinManager->getInfoFromName($email);
		
		$_SESSION["userId"] = $userInfo["ID"];
		$_SESSION["email"] = $userInfo["Email"];
		$_SESSION["firstname"] = $userInfo["Firstname"];
		$_SESSION["lastname"] = $userInfo["Lastname"];

		print_r($registerResult);
		echo "password entered: ".$pass;
		die("success");
	}else{
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There was an error communicating with the server while logging in.");
	}

}
?>