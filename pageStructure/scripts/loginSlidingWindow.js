function openSlideInWindow(){
    if($(".loginWindow").hasClass("loginWindow-open")){
        $(".loginWindow").removeClass("loginWindow-open");
    
    }else{
        $(".loginWindow").addClass("loginWindow-open");
    
    }
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
        $('#logInButtonName').text("User 1");  
    }
    else{
        $(".inputBoxSignIn").addClass("inputBoxSignInError");
    }
}

function goBackToStart(){
    $("#signedIn").css({"display": "none"});
    $("#loginWindow").css({"display": "none"}); 
    $("#firstStep").css({"display": "inline"});
    $('#logInButtonName').text("Log in"); 
}

function openSecondWindow(){
    if($(".secondWindow").hasClass("secondWindow-open")){
        $(".secondWindow").removeClass("secondWindow-open");
    
    }else{
        $(".secondWindow").addClass("secondWindow-open");
    
    }

}