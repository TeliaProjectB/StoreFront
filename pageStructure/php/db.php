<?php
    /* Database connection settings */
    $servername = '192.168.0.8';
    $username = 'TeliaServer';
    $password = 'hmXFXmZeMpBOdLKr';
    $dbname = 'telia';

    // Create connection
    //$mysql = mysql_connect($servername, $username, $password);
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    

?>
