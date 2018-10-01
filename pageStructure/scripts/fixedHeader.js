/* function for header fixed */
window.onscroll = function() {myFunction()};

var header = document.getElementById("head");

function myFunction() {
    var top  = window.pageYOffset || document.documentElement.scrollTop;
    header.style.marginTop = top + "px";
   
}