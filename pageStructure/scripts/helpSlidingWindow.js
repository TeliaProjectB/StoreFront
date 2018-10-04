/************************************
	Functions to open help sidebar
************************************/

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





