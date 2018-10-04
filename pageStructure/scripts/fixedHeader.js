/* function for fixing only first header when user scroll down */

var scrollingUp = false;
var scrollingDown = false;


var lastScrollTop = 0;
$(window).scroll(function () {
    
    var scrollTop = $(this).scrollTop();
    if (scrollTop < lastScrollTop){
        if(scrollingDown == false){
            $('.secondHeader').stop();
            $('.secondHeader').slideDown();

            scrollingUp = false;
            scrollingDown = true;
        }
        
        
    } else {
        if(scrollingUp == false){
            $('.secondHeader').stop();

            $('.secondHeader').slideUp();
            scrollingUp = true;
            scrollingDown = false;
        }  
        
       
    }
    lastScrollTop = scrollTop;
})

function showSecondHeader(){
    
    if($('.secondHeader:visible').length == 0){
        $('.secondHeader').slideDown();
    }
}
