<?php
    /* Database connection settings */
    $host = '10.11.0.7'; // Ip-address 
    $user = 'root';
    $pass = 'password';
    $db = 'accounts'; //Which database
    $mysqli = new mysqli($host,$user,$pass,$db) or die($mysqli->error);
?>