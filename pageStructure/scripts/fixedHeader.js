
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
            
            $('.thirdHeader').stop();
            $('.thirdHeader').slideDown();
            scrollingUp = false;
            scrollingDown = true;
        }
        
    } else {
        if(scrollingUp == false && scrollTop > 131){
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

    var allowMinimizeSeeMore = false;
    $(".dropdown > .headerButton").hover(function(){
        $('.dropdown > .dropdown-content').css("max-height", "70vh");
        $('.dropdown > .dropdown-content').css("pointer-events", "auto");
        allowMinimizeSeeMore = true;
    }, function(){
        $(".dropdown-content").hover(function(){
            $('.dropdown > .dropdown-content').css("max-height", "70vh");
            $('.dropdown > .dropdown-content').css("pointer-events", "auto");
            allowMinimizeSeeMore = true;
        }, function(){
            $('.dropdown > .dropdown-content').css("max-height", "0px");
            $('.dropdown > .dropdown-content').css("pointer-events", "none");
            allowMinimizeSeeMore = false;
        });
        $('.dropdown > .dropdown-content').css("max-height", "0px");
        $('.dropdown > .dropdown-content').css("pointer-events", "none");
        allowMinimizeSeeMore = false;
    });





    $(document).on("touchstart", function(e){
        if(!allowMinimizeSeeMore){
            return;
        }
        var container = $(".dropdown > .dropdown-content");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            $('.dropdown > .dropdown-content').css("max-height", "0px");
            $('.dropdown > .dropdown-content').css("pointer-events", "none");
            allowMinimizeSeeMore = false;
        }
    });

});
