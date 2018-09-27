function scrollDownTo(nameOfTag){
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + nameOfTag).offset().top
    }, 1000);
}

window.onscroll = function() {myFunction()};

var header = document.getElementById("head");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function openCloseDropdown(){
  $(".dropdown-content").animate({height: 'toggle'});  
}
