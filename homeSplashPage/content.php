
<!-- special Style for this componenet -->
<link rel="stylesheet" type="text/css" href="/StoreFront/homeSplashPage/css/changeAPI.css">
<link rel="stylesheet" type="text/css" href="/StoreFront/homeSplashPage/css/splashContentStyle.css">


<div id="splash">


        <div class="box">
            <div class="mySlides" onclick="window.open('/StoreFront/api?id=5u674','_self')">
                <div class="splashTitle">Recommended for you</div>
                <div class="splashSubTitle">SMS 1 000 pcs</div>
                <div class="splashDescription">
                    Send 1000 sms when you want, but it has to be during a year after you bought to API. 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/sms3.png">
            </div>
           
            <?php
                require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/homeSplashPage/php/getAPIContent.php'; 
            ?>
             
            <div class="mySlides" onclick="window.open('/StoreFront/api?id=324rfe','_self')">
                <div class="splashTitle">Most recommended</div>
                <div class="splashSubTitle">Call one month</div>
                <div class="splashDescription">
                    Charge your phone with calling time, this API let you call as mutch as you want for 30 day. 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/call3.png">

            </div>
        </div>
    
   


<!--
    <div class="splashButtonNavigators">
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
    </div>
-->
</div>

<script type="text/javascript" src="/StoreFront/homeSplashPage/scripts/contentInsideWindow.js"></script>
<script type="text/javascript" src="/StoreFront/homeSplashPage/scripts/changeAPIScript.js"></script>

