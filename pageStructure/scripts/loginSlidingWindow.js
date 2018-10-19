/************************************
	Functions to open login sidebar
************************************/
var flag = false;

function openSlideInWindow(){
    if(!$(".loginWindow").is(":animated")){
        $(".loginWindow").stop();

        if($('.helpWindow:visible').length != 0 && !$('.helpWindow').is(':animated')){
            $(".helpWindow").animate({width: 'toggle'});
        }

        $(".loginWindow").animate({width: 'toggle'});
        if(flag){
            flag = false
        }else{
            flag = true;
        }
    }    
}

function openHelpWindow(){
    flag = false;
    if(!$(".helpWindow").is(":animated")){
        $(".helpWindow").stop();
        
        if($('.loginWindow:visible').length != 0 && !$('.loginWindow').is(':animated')){
            $(".loginWindow").animate({width: 'toggle'});
        }

        $(".helpWindow").animate({width: 'toggle'});
        $("#helpWindow").css({"display": "inline"});


        for (var i = 0; i < 6; i++) {
            $("#answer" + i).css({"display": "none"});
        }
        
    }
}


//Clicking on the website the it will close the login window
$(document).on('click','#contentID',function(){
    // additional code
    if($('.loginWindow:visible').length != 0 && !$('.loginWindow:animated')){
        $(".loginWindow").stop();
        $(".loginWindow").animate({width: 'toggle'});
        flag = false;
    }
});
$(document).on('click','#head',function(e){
    if(e.target != document.getElementById("userIcon") && e.target != document.getElementById("helpContact") && !$('.loginWindow').is(':animated')) {
        if($('.loginWindow:visible').length != 0 ){
            $(".loginWindow").stop();
            $(".loginWindow").animate({width: 'toggle'});
            flag = false;
        }
    }
});

//Clossing login window when scrolling down
$(document).ready(function() { 
    $(window).scroll(function() {
        // additional code
        //console.log("Length: ", $('.loginWindow:visible').length)
        if(flag == true){
            flag = false;
            if(!$(".loginWindow").is(":animated")){
                $(".loginWindow").stop();
                $(".loginWindow").animate({width: 'toggle'});
                
            }
        } 
    });
});


function openLoginWindow(){
    $("#firstStep").css({"display": "none"});
    $("#loginWindow").css({"display": "inline"});
}

function openRegisterWindow(){
    $("#firstStep").css({"display": "none"});
    $("#register").css({"display": "inline"});
}

$("#password").on('keyup', function (e) {
    if (e.keyCode == 13) {
        signInUser(function(statusFromLogin){
            if(statusFromLogin){
                window.open("/StoreFront/home", "_self");
                
            }
            else{
                // Username
                //box-shadow: 0 0 5px 10px #555;
                //username.style.box-shadow = '0 0 5px 10px red';
                email.classList.add('error-test');
                
                // Add a class that defines an animation
                email.classList.add('error');
                  
                // remove the class after the animation completes
                setTimeout(function() {
                    email.classList.remove('error');
                }, 300);
        
        
                // Password
                password.classList.add('error-test');
                    
                // Add a class that defines an animation
                password.classList.add('error');
              
                // remove the class after the animation completes
                setTimeout(function() {
                    password.classList.remove('error');
                }, 300);
        
        
                setTimeout(function() {
                    email.classList.remove('error-test');
                    password.classList.remove('error-test');
                }, 1000);
            }
        });
    }
});

function checkUser(){
    signInUser(function(statusFromLogin){
        if(statusFromLogin){
            window.open("/StoreFront/home", "_self");
            
        }
        else{
            // Username
            //box-shadow: 0 0 5px 10px #555;
            //username.style.box-shadow = '0 0 5px 10px red';
            email.classList.add('error-test');
            
            // Add a class that defines an animation
            email.classList.add('error');
              
            // remove the class after the animation completes
            setTimeout(function() {
                email.classList.remove('error');
            }, 300);
    
    
            // Password
            password.classList.add('error-test');
                
            // Add a class that defines an animation
            password.classList.add('error');
          
            // remove the class after the animation completes
            setTimeout(function() {
                password.classList.remove('error');
            }, 300);
    
    
            setTimeout(function() {
                email.classList.remove('error-test');
                password.classList.remove('error-test');
            }, 1000);
        }
    });
}

function goBackToStart(){
    $("#signedIn").css({"display": "none"});
    $("#loginWindow").css({"display": "none"}); 
    $("#register").css({"display": "none"}); 
    $("#firstStep").css({"display": "inline"});
}

function closeLoginWindow(){
    $(".loginWindow").animate({width: 'toggle'});
}



function checkTrolly(){
    checkAPI(function(statusFromLogin){
        if(statusFromLogin){
            window.open("/StoreFront/home", "_self");
            
        }
        else{
            // Username
            //box-shadow: 0 0 5px 10px #555;
            //username.style.box-shadow = '0 0 5px 10px red';
            email.classList.add('error-test');
            
            // Add a class that defines an animation
            email.classList.add('error');
              
            // remove the class after the animation completes
            setTimeout(function() {
                email.classList.remove('error');
            }, 300);
    
    
            // Password
            password.classList.add('error-test');
                
            // Add a class that defines an animation
            password.classList.add('error');
          
            // remove the class after the animation completes
            setTimeout(function() {
                password.classList.remove('error');
            }, 300);
    
    
            setTimeout(function() {
                email.classList.remove('error-test');
                password.classList.remove('error-test');
            }, 1000);
        }
    });
}

function agreed(){
    console.log("Active");
    $("#panelButton").css({"background-color": "#5a179c"});
    $('#panelButton').prop('disabled', false);
}