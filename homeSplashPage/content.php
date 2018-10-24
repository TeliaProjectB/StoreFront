
<!-- special Style for this componenet -->
<link rel="stylesheet" type="text/css" href="/StoreFront/homeSplashPage/css/changeAPI.css">
<link rel="stylesheet" type="text/css" href="/StoreFront/homeSplashPage/css/splashContentStyle.css">


<div id="splash">
    <div class="box">
        <div class="mySlides" onclick="smartJsLink('/StoreFront/api?id=5u674')">
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
    </div>
    
    <div class="splashButtonNavigators">
        <button onclick="goToAPI(1)" id="button1" class="splashNavButton"></button>
        <button onclick="goToAPI(2)" id="button2" class="splashNavButton"></button>
        <button onclick="goToAPI(3)" id="button3" class="splashNavButton"></button>
        <button onclick="goToAPI(4)" id="button4" class="splashNavButton"></button>
    </div>

</div>
<script type="text/javascript" src="/StoreFront/homeSplashPage/scripts/changeAPIScript.js"></script>

