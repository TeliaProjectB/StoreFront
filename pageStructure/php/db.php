<?php
    /* Database connection settings */
    $servername = '10.11.3.71';
    $username = 'testUser';
    $password = 'RnuUXp3k0jDX0DR1';
    $dbname = 'telia';

    //8UF5J264pK19KxVK

    
    // Create connection
    $mysql = mysql_connect($servername, $username, $password);
    //$conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$mysql) {
        die("Connection failed: ");
    } 

?>