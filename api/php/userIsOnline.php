<?php

session_start();

if(!isset($_SESSION["userId"])){
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
}

?>