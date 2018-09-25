function openSlideInWindow(){
    $(".loginWindow").animate({width: 'toggle'});

    if($('.secondWindow:visible').length != 0){
        $(".secondWindow").animate({width: 'toggle'});
    }
}

function openSecondWindow(){
    $(".secondWindow").animate({width: 'toggle'});
}


function openLoginWindow(){
    $("#firstStep").css({"display": "none"});
    $("#loginWindow").css({"display": "inline"});
}

function checkUser(){
    var username = $('#username').val();
    var password = $('#password').val();

    if(username == "hi" && password == "123"){
        $("#loginWindow").css({"display": "none"});
        $("#signedIn").css({"display": "inline"});   
    }
    else{
        $(".inputBoxSignIn").addClass("inputBoxSignInError");
    }
}

function goBackToStart(){
    $("#signedIn").css({"display": "none"});
    $("#loginWindow").css({"display": "none"}); 
    $("#firstStep").css({"display": "inline"});
}

