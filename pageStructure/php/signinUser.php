<?php


session_start();
if(isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("You are already logged in.");
}

require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/signinUserClass.php';

$signinManager = new signinUser;


if(isset($_POST["userName"]) && isset($_POST["password"])){
    $name = htmlspecialchars($_POST["userName"]);
    $pass = $_POST["password"];
    

    $registerResult = $signinManager->checkUserFromSQL($name, $pass);

    if( $registerResult  ===  true){
    	echo "true";
    }else if( $registerResult  ===  false){
    	echo "false";
    }


    echo "\n";
	if($registerResult === true){
		$userInfo = $signinManager->getInfoFromName($name);
		
		$_SESSION["userId"] = $userInfo["ID"];
		$_SESSION["User_name"] = $userInfo["User_name"];
		$_SESSION["firstname"] = $userInfo["firstname"];
		$_SESSION["lastname"] = $userInfo["lastname"];

		print_r($registerResult);
		echo "password entered: ".$pass;
		die("success");
	}else{
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die("There was an error communicating with the server while logging in.");
	}

}
?>