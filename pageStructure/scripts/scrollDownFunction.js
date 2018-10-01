function scrollDownTo(nameOfTag){
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + nameOfTag).offset().top
    }, 1000);
}

/* dropdown scroll */
function openCloseDropdown(){
  $(".dropdown-content").animate({height: 'toggle'});  
}

