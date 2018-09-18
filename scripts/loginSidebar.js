function open_sidebar() {
    document.getElementById("mySidenav").style.width = "180px";
    document.getElementById("main").style.marginLeft = "200px";
}
function close_sidebar() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
function openSlideInWindow(){
    if($(".loginWindow").hasClass("loginWindow-open")){
        console.log("Add style")
        $(".loginWindow").removeClass("loginWindow-open");
    
    }else{
        $(".loginWindow").addClass("loginWindow-open");
    
    }
}