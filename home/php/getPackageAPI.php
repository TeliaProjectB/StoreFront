<?php
    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/home/php/getPackageAPIClass.php';
    $getPackageAPI = new getPackageAPI;


    echo "
        <div class='simpleApiBox panelActive'>
            <div class='titleDescContainer'>
                <div class='apiTitle'>SMS 1 day</div>
                <div class='apiBackground' style='background-image: url(/StoreFront/globalImages/API/sms1.png);'></div>
                <div class='apiDescription'>With this API you are able to send how many sms as you want for one day.</div>
            </div>
        </div>";

?>