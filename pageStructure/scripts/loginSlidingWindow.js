/************************************
	Functions to open login sidebar
************************************/
var flag = false;

function openSlideInWindow(){
    if(!$(".loginWindow").is(":animated")){
        $(".loginWindow").stop();

        if($('.helpWindow:visible').length != 0){
            $(".helpWindow").animate({width: 'toggle'});
        }

        $(".loginWindow").animate({width: 'toggle'});
        flag = true;
    }else{
        flag = false;
    }
    
}

function openHelpWindow(){
    if(!$(".helpWindow").is(":animated")){
        $(".helpWindow").stop();
        
        if($('.loginWindow:visible').length != 0){
            $(".loginWindow").animate({width: 'toggle'});
        }
        if($('.secondWindow:visible').length != 0){
            $(".secondWindow").animate({width: 'toggle'});
        }

        $(".helpWindow").animate({width: 'toggle'});
        $("#helpWindow").css({"display": "inline"});


        $("#answer1").css({"display": "none"});
        $("#answer2").css({"display": "none"});
        $("#answer3").css({"display": "none"});
        $("#answer4").css({"display": "none"});
        $("#answer5").css({"display": "none"});
    }
    
}


//Clicking on the website the it will close the login window
$(document).on('click','#contentID',function(){
    // additional code
    if($('.loginWindow:visible').length != 0){
        $(".loginWindow").stop();
        $(".loginWindow").animate({width: 'toggle'});
        flag = true;
    }
});


//Clossing login window when scrolling down
$(document).ready(function() { 
    $(window).scroll(function() {
        // additional code
        //console.log("Length: ", $('.loginWindow:visible').length)
        if(flag){
            if(!$(".loginWindow").is(":animated")){
                $(".loginWindow").stop();
                $(".loginWindow").animate({width: 'toggle'});
            }
            flag = false;
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

function checkUser(){
    var usernameText = $('#username').val();
    var passwordText = $('#password').val();
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    if(usernameText == "hi" && passwordText == "123"){
        $("#loginWindow").css({"display": "none"});
        $("#signedIn").css({"display": "inline"});  
    
            
        document.getElementById("showUsername").innerHTML = "Hi, " + usernameText + "!";
        $("#userIcon").css({"margin-left": "2vw"});  
        
    }
    else{
        // Username
        //box-shadow: 0 0 5px 10px #555;
        //username.style.box-shadow = '0 0 5px 10px red';
        username.classList.add('error-test');
        
        // Add a class that defines an animation
        username.classList.add('error');
          
        // remove the class after the animation completes
        setTimeout(function() {
            username.classList.remove('error');
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
            username.classList.remove('error-test');
            password.classList.remove('error-test');
        }, 1000);
    }
}

function goBackToStart(){
    $("#signedIn").css({"display": "none"});
    $("#loginWindow").css({"display": "none"}); 
    $("#firstStep").css({"display": "inline"});
}

function closeLoginWindow(){
    $(".loginWindow").animate({width: 'toggle'});
}


