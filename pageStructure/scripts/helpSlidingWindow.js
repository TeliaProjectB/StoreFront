function openHelpWindow(){
    $(".helpWindow").animate({width: 'toggle'});
    $("#helpWindow").css({"display": "inline"});

    
    $("#answer1").css({"display": "none"});
    $("#answer2").css({"display": "none"});
    $("#answer3").css({"display": "none"});
}

function openQuestion(id_clicked){

    if(id_clicked == "question1") {
        if ($('#answer1:visible').length != 0){
            $("#answer1").css({"display": "none"});
        }
        else {
            $("#answer1").css({"display": "inline"});
        }
    }

    if(id_clicked == "question2") {
        if ($('#answer2:visible').length != 0){
            $("#answer2").css({"display": "none"});
        }
        else {
            $("#answer2").css({"display": "inline"});
        }
    }

    if(id_clicked == "question3") {
        if ($('#answer3:visible').length != 0){
            $("#answer3").css({"display": "none"});
        }
        else {
            $("#answer3").css({"display": "inline"});
        }
    }
}





