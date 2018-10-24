<?php
    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/homeSplashPage/php/getAPIClass.php';
    $getAPIClass = new getAPIClass;

    $mostBought = $getAPIClass->getMostBoughtAPI();
    $mostLiked = $getAPIClass->getMostLikedAPI();
    $mostBoughtPackage = $getAPIClass->getMostBoughtAPIPackage();


    echo "
        <div class='mySlides' onclick='smartJsLink(\"/StoreFront/api/?id=".$mostBought["RandomId"]."\")'>
            <div class='splashTitle'>Most bought</div>
            <div class='splashSubTitle'>" . $mostBought['Name'] . "</div>
            <div class='splashDescription'>
                " . $mostBought['Description'] . " 
            </div>
            <img class='imgDecoration' src='/StoreFront/globalImages/API/" . $mostBought['ImgName'] . "'>
        </div>     
    ";

    
    echo "
        <div class='mySlides' onclick='smartJsLink(\"/StoreFront/api/?id=".$mostLiked["RandomId"]."\")'>
            <div class='splashTitle'>Most liked</div>
            <div class='splashSubTitle'>" . $mostLiked['Name'] . "</div>
            <div class='splashDescription'>
                " . $mostLiked['Description'] . " 
            </div>
            <img class='imgDecoration' src='/StoreFront/globalImages/API/" . $mostLiked['ImgName'] . "'>
        </div>     
    ";


    echo "
        <div class='mySlides' onclick='smartJsLink(\"/StoreFront/api/?id=".$mostBoughtPackage["RandomId"]. "&p=true" ."\")'>
            <div class='splashTitle'>Most Bought API Package</div>
            <div class='splashSubTitle'>" . $mostBoughtPackage['Name'] . "</div>
            <div class='splashDescription'>
                " . $mostBoughtPackage['Description'] . " 
            </div>
            <img class='imgDecoration' src='/StoreFront/globalImages/API/" . $mostBoughtPackage['ImgName'] . "'>
        </div>     
    ";
?>
