function openSlideInWindow(){
    $(".loginWindow").animate({width: 'toggle'});

    if($('.secondWindow:visible').length != 0){
        $(".secondWindow").animate({width: 'toggle'});
    }
}

function openSecondWindow(){
    $(".secondWindow").animate({width: 'toggle'});
}

$(document).on('click','#contentID',function(){
    //  $(this) = your current element that clicked.
    // additional code
    if($('.loginWindow:visible').length != 0){
        $(".loginWindow").animate({width: 'toggle'});
    }
    if($('.secondWindow:visible').length != 0){
        $(".secondWindow").animate({width: 'toggle'});
    }
});

function openLoginWindow(){
    $("#firstStep").css({"display": "none"});
    $("#loginWindow").css({"display": "inline"});
}

function checkUser(){
    var usernameText = $('#username').val();
    var passwordText = $('#password').val();
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    if(usernameText == "hi" && passwordText == "123"){
        $("#loginWindow").css({"display": "none"});
        $("#signedIn").css({"display": "inline"});  
    
            
        document.getElementById("showUsername").innerHTML = "Hi, " + usernameText;
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


