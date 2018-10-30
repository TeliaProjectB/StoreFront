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
            flag = false;
        }else{
            flag = true;
        }
    }    
}

//Clicking on the website it will close the login window
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

//Closing login window when scrolling down
$(document).ready(function() { 
    $(window).scroll(function() {
        // additional code
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
    flag = false;
}

function openRegisterWindow(){
    $("#firstStep").css({"display": "none"});
    $("#register").css({"display": "inline"});
    flag = false;
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
    flag = true;
}

function closeLoginWindow(){
    $(".loginWindow").animate({width: 'toggle'});
    flag = false;
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

var agreedStatus = false; 

function agreedToTerms(){
    if(!agreedStatus){
        $(".strongButtonPanel").css({"background-color": "#5a179c"});
        $(".strongButtonPanel").css({"cursor": "pointer"});
        $('.strongButtonPanel').prop('disabled', false);
        agreedStatus = true;
    }
    else{
        $(".strongButtonPanel").css({"background-color": "gray"});
        $(".strongButtonPanel").css({"cursor": "not-allowed"});
        $('.strongButtonPanel').prop('disabled', true);    
        agreedStatus = false;
    }
}
