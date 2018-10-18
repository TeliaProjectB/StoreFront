function myFunction() {
    var x = document.getElementById("contentMyAccount");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function Function() {
    var p = document.getElementById("contentMyAccount2");
    if (p.style.display === "none") {
        p.style.display = "block";
    } else {
        p.style.display = "none";
    }
}

function unction() {
    var m = document.getElementById("contentMyAccount3");
    if (m.style.display === "none") {
        m.style.display = "block";
    } else {
        m.style.display = "none";
    }
}

			
function nction() {
    var n = document.getElementById("contentMyAccount4");
    if (n.style.display === "none") {
        n.style.display = "block";
    } else {
        n.style.display = "none";
    }
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}