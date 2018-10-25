
/* function for fixing only first header when user scroll down */

var scrollingUp = false;
var scrollingDown = false;


var lastScrollTop = 0;
$(window).scroll(function () {
    
    var scrollTop = $(this).scrollTop();
    console.log(scrollTop);
    if (scrollTop < lastScrollTop){
        if(scrollingDown == false){
            $('.secondHeader').stop();
            $('.secondHeader').slideDown();
            
            $('.thirdHeader').stop();
            $('.thirdHeader').slideDown();
            scrollingUp = false;
            scrollingDown = true;
        }
        
    } else {
        if(scrollingUp == false && scrollTop > 200){
            $('.secondHeader').stop();
            $('.thirdHeader').stop();

            $('.secondHeader').slideUp();
            $('.thirdHeader').slideUp();
            scrollingUp = true;
            scrollingDown = false;
        }
            
       
    }
    lastScrollTop = scrollTop;
})

function showSecondHeader(){
    if(document.getElementById("secondHead") != null) {

    if($('.secondHeader:visible').length == 0){
        $('.secondHeader').stop();
        $('.secondHeader').slideDown();

        $('.thirdHeader').stop();
        $('.thirdHeader').slideDown();
        scrollingUp = false;
    }
}
}

/*function to let the dropdown "see more" work */
$(document).ready(function(){

    $(".dropdown > .headerButton").hover(function(){
        $('.dropdown > .dropdown-content').css("height", "210px");
    }, function(){
        $(".dropdown-content").hover(function(){
            $('.dropdown > .dropdown-content').css("height", "210px");
        }, function(){
            $('.dropdown > .dropdown-content').css("height", "0px");
        });
        $('.dropdown > .dropdown-content').css("height", "0px");
    });

});
