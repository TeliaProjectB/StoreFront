<?php


if(isset($_POST["city"]) && isset($_POST["projection"])){
	$randCelcius = rand() % 10;
	$baseTemp = 10;

	$newTemp = $baseTemp + $randCelcius;

	echo "The projected temperature for ".$_POST["city"]." in ".$_POST["projection"]." days is: ".$newTemp;
}else{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die("Please includde both parameters: \"city\" and \"projection\".");
}


?>