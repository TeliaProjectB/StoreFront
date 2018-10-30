/************************************
    Functions to open help sidebar
************************************/

/*show contact number */

function openContact(contact_clicked){
    
    for (var i = 1; i < 4; i++) {
        if(contact_clicked == "contact" + i) {
            if ($('#contactInformation' + i + ':visible').length != 0){
                $("#contactInformation" + i).css({"display": "none"});
            }
            else {
                $("#contactInformation" + i).css({"display": "block"});
            }
        }
    }
}





/*show the questions */
var question1 = "How can I find all the API?";
var question2 = "How can I buy more API?";
var question3 = "How can I change my account?"
var question4 = "What are the accepted payment methods?" 						
var question5 = "How can I find an API that there isn't on the site?" 

for (var i = 1; i < 6; i++) {
    document.getElementById("question" + i).innerHTML = window['question' + i];
}

/*show the answers */
var answer1 = "There are two ways to find all the API. You can \
search on the search bar, you can scroll down till the end or you can \
click on the dropdown button others and then click on the button All.";
var answer2 = "To buy more API you can go to an API, click the button add to card and continue shopping.";
var answer3 = "If you want to change your account information you can click on your username \
or your user icon and click on My account, then click on change information."
var answer4 = "You can pay the API with Mastercard, Visa or American Express." 						
var answer5 = "You can search on the search bar if the API is in the website, if there isn't   \
you can send an email to Telia Service Center and we will add it if possible." 

function openAnswer(question_clicked){

    for (var i = 1; i < 6; i++) {
        if(question_clicked == "question" + i) {
            if ($('#answer' + i + ':visible').length != 0){
                $("#answer" + i).css({"display": "none"});
            }
            else {
                $("#answer" + i).css({"display": ""});
                document.getElementById("answer" + i).innerHTML = window['answer' + i];
            }
        }
    }
}


//Clicking on the website the it will close the login window
$(document).on('click','#contentID',function(){
    if($('.helpWindow:visible').length != 0 && !$('.helpWindow').is(':animated')){
        $(".helpWindow").stop();
        $(".helpWindow").animate({width: 'toggle'});
    }
});
$(document).on('click','#head',function(e){
    if(e.target != document.getElementById("helpContact") && e.target != document.getElementById("userIcon")  && !$('.helpWindow').is(':animated')) {
        if($('.helpWindow:visible').length != 0){
            $(".helpWindow").stop();
            $(".helpWindow").animate({width: 'toggle'});
        }
    }
});
