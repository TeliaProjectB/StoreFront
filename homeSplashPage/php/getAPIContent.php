<?php
    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/homeSplashPage/php/getAPIClass.php';
    $getAPIClass = new getAPIClass;

    $mostBought = $getAPIClass->getMostBoughtAPI();
    $mostLiked = $getAPIClass->getMostLikedAPI();

    echo "
        <div class='mySlides' onclick='window.open('/StoreFront/api?id=b3bkv','_self')'>
            <div class='splashTitle'>Most bought</div>
            <div class='splashSubTitle'>" . $mostBought['Name'] . "</div>
            <div class='splashDescription'>
                " . $mostBought['Description'] . " 
            </div>
            <img class='imgDecoration' src='/StoreFront/globalImages/API/" . $mostBought['ImgName'] . ".jpg'>
        </div>     
    ";

    

    echo "
        <div class='mySlides' onclick='window.open('/StoreFront/api?id=b3bkv','_self')'>
            <div class='splashTitle'>Most liked</div>
            <div class='splashSubTitle'>" . $mostLiked['Name'] . "</div>
            <div class='splashDescription'>
                " . $mostLiked['Description'] . " 
            </div>
            <img class='imgDecoration' src='/StoreFront/globalImages/API/" . $mostLiked['ImgName'] . ".png'>
        </div>     
    ";
?>