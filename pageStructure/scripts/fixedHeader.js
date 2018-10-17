
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
        document.getElementById("homeBreadcrumb").style.display="inline";

        $('.breadcrumbs li+li').attr('content-before','/');
        document.getElementById('secondPage').innerHTML = "API";
        break;
    case "/StoreFront/apiPackage/":
        document.getElementById("homeBreadcrumb").style.display="inline";

        $('.breadcrumbs li+li').attr('content-before','/');
        document.getElementById('secondPage').innerHTML = "APIpackage";
        break;
    case "/StoreFront/category/":
        document.getElementById("homeBreadcrumb").style.display="inline";

        $('.breadcrumbs li+li').attr('content-before','/');
        document.getElementById('secondPage').innerHTML = getURLVariable("cat").replace(/[&\/\\#,+()$~%20.'":*?<>{}]/g, ' ');
        break;
    case "/StoreFront/myAccount/":
        document.getElementById("homeBreadcrumb").style.display="inline";

        $('.breadcrumbs li+li').attr('content-before','/');   
        document.getElementById('secondPage').innerHTML = "My Account";
        break;
    case "/StoreFront/checkout/":
        document.getElementById("homeBreadcrumb").style.display="inline";

        $('.breadcrumbs li+li').attr('content-before','/');   
        document.getElementById('secondPage').innerHTML = "Checkout";
        break;
    default:
        break;
}

/*function to let the dropdown "see more" work */
$(document).ready(function(){

    $(".dropdown > .headerButton").hover(function(){
        $('.dropdown > .dropdown-content').css("height", "290px");
    }, function(){
        $(".dropdown-content").hover(function(){
            $('.dropdown > .dropdown-content').css("height", "290px");
        }, function(){
            $('.dropdown > .dropdown-content').css("height", "0px");
        });
        $('.dropdown > .dropdown-content').css("height", "0px");
    });

});
