function openSlideInWindow(){
    if($(".loginWindow").hasClass("loginWindow-open")){
        $(".loginWindow").removeClass("loginWindow-open");
    
    }else{
        $(".loginWindow").addClass("loginWindow-open");
    
    }
}