<?php

//get all item put in trolley
require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';


if(isset($_SESSION["userId"])){
    $sql = "SELECT * FROM `shoppingTrolly` WHERE `IDUser`=".$_SESSION["userId"];
    $result = $conn->query($sql);
    $items = mysqli_num_rows($result);
        
}


?>