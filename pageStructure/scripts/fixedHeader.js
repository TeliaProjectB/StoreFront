/* function for fixing only first header when user scroll down */

var lastScrollTop = 0;
$(window).scroll(function () {
    
    var scrollTop = $(this).scrollTop();
    if (scrollTop < lastScrollTop){
        $('.secondHeader').slideDown();
    } else {
        $('.secondHeader').slideUp();
       
    }
    lastScrollTop = scrollTop;
})

function showSecondHeader(){
    
    if($('.secondHeader:visible').length == 0){
        $('.secondHeader').slideDown();
    }
}
