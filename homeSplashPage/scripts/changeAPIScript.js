var myIndex = 0;
changeElement();

function changeCurrentButton(myIndex){
    var x = document.getElementsByClassName("splashNavButton");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "gray"; 
    }

    var button = document.getElementById("button" + myIndex );
    button.style.border = "solid 1px gray";
    button.style.backgroundColor = "white";
}

function changeElement() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1
    }    
    x[myIndex-1].style.display = "block";
    
    changeCurrentButton(myIndex);
    setTimeout(changeElement, 6000);    
}



function goToAPI(goToThisAPI){
    myIndex = goToThisAPI;
    
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }

        
    x[myIndex-1].style.display = "block";
    changeCurrentButton(myIndex);
}