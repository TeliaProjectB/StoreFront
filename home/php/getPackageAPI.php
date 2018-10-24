<?php
    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/home/php/getPackageAPIClass.php';
    $getPackageAPI = new getPackageAPI;

    $getPackageAPIContent = $getPackageAPI->returnAPIPackageFromID();

    
    foreach($getPackageAPIContent as $api){  
        echo "
        <div class='simpleApiBox panelActive' onclick='window.open(\"/StoreFront/api/?id=".$api["RandomId"] . "&p=true"."\", \"_self\")'>
            <div class='titleDescContainer'>
                <div class='apiTitle'>". $api['Name'] ."</div>
                <div class='apiBackground' style='background-image:url(\" /StoreFront/globalImages/API/". $api['ImgName']."\")'></div>
                <div class='apiDescription'>". $api['Description'] ."</div>
                <div class='apiPriceRow'> " . $api['Price'] . " kr</div>
            </div>
        </div>";
    }
?>
