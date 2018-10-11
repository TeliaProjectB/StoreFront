/************************************
    Functions to open help sidebar
************************************/
function openQuestion(id_clicked){

    if(id_clicked == "question1") {
        if ($('#answer1:visible').length != 0){
            $("#answer1").css({"display": "none"});
        }
        else {
            $("#answer1").css({"display": ""});
        }
    }

    if(id_clicked == "question2") {
        if ($('#answer2:visible').length != 0){
            $("#answer2").css({"display": "none"});
        }
        else {
            $("#answer2").css({"display": ""});
        }
    }

    if(id_clicked == "question3") {
        if ($('#answer3:visible').length != 0){
            $("#answer3").css({"display": "none"});
        }
        else {
            $("#answer3").css({"display": ""});
        }
    }

    if(id_clicked == "question4") {
        if ($('#answer4:visible').length != 0){
            $("#answer4").css({"display": "none"});
        }
        else {
            $("#answer4").css({"display": ""});
        }
    }

    if(id_clicked == "question5") {
        if ($('#answer5:visible').length != 0){
            $("#answer5").css({"display": "none"});
        }
        else {
            $("#answer5").css({"display": ""});
        }
    }
}

//Clicking on the website the it will close the login window
$(document).on('click','#contentID',function(){
    if($('.helpWindow:visible').length != 0){
        $(".helpWindow").stop();
        $(".helpWindow").animate({width: 'toggle'});
    }
});
$(document).on('click','#head',function(e){
    if(e.target != document.getElementById("helpContact") && e.target != document.getElementById("userIcon")) {
        if($('.helpWindow:visible').length != 0){
            $(".helpWindow").stop();
            $(".helpWindow").animate({width: 'toggle'});
        }
    }
});
