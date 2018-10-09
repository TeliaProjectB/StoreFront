
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
        if(scrollingUp == false){
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
    
    if($('.secondHeader:visible').length == 0){
        $('.secondHeader').stop();
        $('.secondHeader').slideDown();

        $('.thirdHeader').stop();
        $('.thirdHeader').slideDown();
        scrollingUp = false;
    }
}

/* function for breadcrumbs displaying in which interface the user is in */

var pathname = window.location.pathname;

switch(pathname) {
    case "/StoreFront/home/":
        break;
    case "/StoreFront/api/":
        $('.breadcrumbs li+li').attr('content-before','/');
        document.getElementById('secondPage').innerHTML = "Single Api";
        break;
    case "/StoreFront/category/":
        $('.breadcrumbs li+li').attr('content-before','/');
        document.getElementById('secondPage').innerHTML = getURLVariable("cat").replace(/[&\/\\#,+()$~%20.'":*?<>{}]/g, ' ');;
        break;
    case "/StoreFront/myAccount/":
        $('.breadcrumbs li+li').attr('content-before','/');   
        document.getElementById('secondPage').innerHTML = "My Account";
        break;
    default:
        break;
}