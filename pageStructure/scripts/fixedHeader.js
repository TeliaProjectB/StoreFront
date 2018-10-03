/* function for header fixed

var navbar = document.getElementById("head");
var sticky = navbar.offsetTop;


navbar.classList.add("sticky");

$('#pageContentWrapper').on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop + $(this).innerHeight() >= this.scrollHeight) {
        $('#secondHead').css({"display":"flex"});
    } else if (scrollTop <= 0) {
        $('#secondHead').css({"display":"flex"});
    } else {
        $('#secondHead').css({"display":"none"});
    }
  }); */