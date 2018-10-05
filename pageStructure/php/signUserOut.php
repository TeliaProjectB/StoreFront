<?php

session_start();

if(isset($_SESSION["userId"])){
	session_unset();
    session_destroy();
    session_write_close();
}


?>