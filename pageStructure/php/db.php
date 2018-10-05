<?php
    /* Database connection settings */
    $servernameDB = '10.11.3.71';
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
