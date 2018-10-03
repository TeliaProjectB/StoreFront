/* function for fixing only first header when user scroll down */

window.onscroll = function (e) {  
    var scrollTop = $(this).scrollTop();
    if (scrollTop <= 0) { /* top window */
        $('.secondHeader').css({"display":"flex"});
    } else { /* middle of the window */
        $('.secondHeader').css({"display":"none"});
    } 
} 
