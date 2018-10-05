<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<div id="splash" onclick="window.open('/StoreFront/api?id=3446','_self')">


        <div class="w3-content w3-section box">
            <div class="mySlides w3-animate-right" style="display: inline;">
                <div class="splashTitle">Recommended for you</div>
                <div class="splashSubTitle">Sms API</div>
                <div class="splashDescription">
                    Being able send sms to alert your users can be a very powerfull tool. With this API it is noweasier than ever! 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/call1.jpg">
            </div>
            
            <div class="mySlides w3-animate-right">
                <div class="splashTitle">Best selling</div>
                <div class="splashSubTitle">SMS 5 days</div>
                <div class="splashDescription">
                    Send as many SMS as you want during 5 days. 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/sms1.png">

            </div>
            <div class="mySlides w3-animate-right">
                <div class="splashTitle">Most used</div>
                <div class="splashSubTitle">Weather for sweden</div>
                <div class="splashDescription">
                    See the weather information for Sweden. 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/weather.png">

            </div>  
            <div class="mySlides w3-animate-right">
            <div class="splashTitle">Most recommended</div>
                <div class="splashSubTitle">Call one month</div>
                <div class="splashDescription">
                    Charge your phone with calling time, this API let you call as mutch as you want for 30 day. 
                </div>
                <img class="imgDecoration" src="/StoreFront/globalImages/API/call3.png">

            </div>
        </div>


        <!--
        <div class="flyingEnvelope"></div>
        <div class="SplashTextInfoContainer">
            <div class="splashinfoFlexCon">
                <div class="splashTitle">Recommended for you</div>
                <div class="splashSubTitle">Sms API</div>
                <div class="splashDescription">
                    Being able send sms to alert your users can be a very powerfull tool. With this API it is noweasier than ever! 
                </div>
            </div>
        </div>-->
        
    


<!--
    <div class="splashButtonNavigators">
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
        <button class="splashNavButton"></button>
    </div>
-->
</div>
<script>
       var myIndex = 0;
        carousel();

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";  
            }
            myIndex++;
            if (myIndex > x.length) {
                myIndex = 1
            }    
            x[myIndex-1].style.display = "block";  
            setTimeout(carousel, 6000);    
        }
    </script>

