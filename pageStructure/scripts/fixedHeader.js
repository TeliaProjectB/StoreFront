/* function for header fixed 
window.onscroll = function() {myFunction()};

var header = document.getElementById("head");

function myFunction() {
    var top  = window.pageYOffset || document.documentElement.scrollTop;
    header.style.marginTop = top + "px";
    if($('.loginWindow:visible').length != 0){
        $(".loginWindow").css({display:"none"});
    }
   
}
*/
/*info telia dropdown */
function openInfoTelia(){
    $("#infoTelia").animate({height: 'toggle'});

}


var navbar = document.getElementById("head");
var sticky = navbar.offsetTop;

navbar.classList.add("sticky");
