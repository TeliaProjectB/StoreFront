function scrollDownTo(nameOfTag){

    var pathname = window.location.href;
    if (pathname == "http://localhost/StoreFront/home/") { /* change with window href*/
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + nameOfTag).offset().top
        }, 1000);
    }
    else {
        window.open('/StoreFront/search','_self'); /*change depending on the category */
    }
    
   
}

/* dropdown scroll */
function openCloseDropdown(){
  $(".dropdown-content").animate({height: 'toggle'});  
}

