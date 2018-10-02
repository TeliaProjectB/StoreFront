<?php
    /* Database connection settings */
    $servername = '10.11.3.71';
    $username = 'teliaUser';
    $password = 'bvuJiLgnBOQd6LHg';
    $dbname = 'telia';

    // Create connection
    //$mysql = mysql_connect($servername, $username, $password);
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    

?>