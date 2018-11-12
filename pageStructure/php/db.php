<?php
    /* Database connection settings */
    $servernameDB = 'localhost';
    $usernameDB = 'TeliaServer';
    $passwordDB = 'hmXFXmZeMpBOdLKr';
    $dbname = 'telia';

    // Create connection
    //$mysql = mysql_connect($servername, $username, $password);
    $conn = new mysqli($servernameDB, $usernameDB, $passwordDB, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    

?>
