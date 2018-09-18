function openSlideInWindow(){
    if($(".loginWindow").hasClass("loginWindow-open")){
        console.log("Add style")
        $(".loginWindow").removeClass("loginWindow-open");
    
    }else{
        $(".loginWindow").addClass("loginWindow-open");
    
    }
    console.log("You pushed the login button")
}