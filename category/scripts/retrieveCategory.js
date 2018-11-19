/*
    Generate the api box element from "apiData"
    "apiData" contains: Name, imgName,Description, Priceand RandomId
*/
function createApiBox(apiContainer, apiData){
              
    var newApi = document.createElement("div");
    newApi.className = "simpleApiBox panel3d";


    var apiTitle = document.createElement("div");
    apiTitle.className = "apiTitle";
    apiTitle.innerHTML = apiData.Name;


    var apiIcon = document.createElement("div");
    apiIcon.className = "apiBackground";
    apiIcon.style.backgroundImage = "url(/StoreFront/globalImages/API/"+apiData.imgName+")";

    var apiDescription = document.createElement("div");
    apiDescription.className = "apiDescription";
    apiDescription.innerHTML = apiData.Description;

    var titleDescContainer = document.createElement("div");
    titleDescContainer.className = "titleDescContainer";

    var price = document.createElement("div");
    price.className = "apiPriceRow";
    if (apiData.Price == 0) {
        price.innerHTML = "Free";
    }
    else {
        price.innerHTML = "Price: "+apiData.Price+" kr";
    }

    titleDescContainer.appendChild(apiTitle);
    titleDescContainer.appendChild(apiIcon);
    titleDescContainer.appendChild(apiDescription);
    titleDescContainer.appendChild(price);
            
    newApi.appendChild(titleDescContainer);
    apiContainer.appendChild(newApi);
            
    
    newApi.setAttribute("myApiId", apiData.RandomId);


    newApi.onclick = function(){
        document.body.style.cursor = "wait";
        setTimeout(function(){
            if(apiData.isPackage){
                smartJsLink("/StoreFront/api/?id="+newApi.getAttribute("myApiId")+"&p=true");
            }else{
                smartJsLink("/StoreFront/api/?id="+newApi.getAttribute("myApiId"));
            }
            document.body.style.cursor = "auto";
        }, 60);
    };

    newApi.addEventListener("mousedown", function(){
        newApi.className += " panelActive";
    });

}


/* function to connect with retrieveCategory.php and the database */
function ajaxRequest(postData, phpSource, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", phpSource, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
       
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log(this.responseText);
            onLoad(this.responseText);
        }
    }
    xhr.send(postData); 

}

/*function to get URL name of the category */
function getURL(category){
       var substr = window.location.search.substring(1);
       var split = substr.split("&");
       for (var i = 0; i < split.length; i++) {
               var cat = split[i].split("=");
               if(cat[0] == category){
                   return cat[1];
                }
       }
       return(false);
}

/*create the title of the category */
function createTitle() {
    var titleCat = document.getElementById("categoryTitle");
    
	titleCat.href = "/StoreFront/category?cat="+ getURL("cat");
	
	titleCat.innerHTML= getURL("cat").replace(/[&\/\\#,+()$~%2027.'":*?<>{}]/g, ' ');
}

/*connect to database and create all api */
ajaxRequest("cat=" + getURL("cat"), "/StoreFront/category/php/retrieveCategory.php", function(response){
    if(response.replace(/ /g, '') == ""){
	    response = "[]";
    }
    var retrievedData = JSON.parse(response);
    var container = document.getElementById("searchedCategory");

    if(retrievedData.length == 0){
        container.innerHTML = "No result was found";
    }else{
        container.innerHTML = "";
    }

    
    createTitle();

    for(var i=0; i<retrievedData.length; i++){
        createApiBox(container, retrievedData[i]);
    }

    document.getElementById("onStartloading").style.display = "none";
    
    //get all 3d panels
    var panels3d = document.getElementsByClassName("panel3d");
    var titleDesc = document.getElementsByClassName("titleDescContainer");
    for(var i=0; i<panels3d.length; i++){
        animatePanel(panels3d.length, panels3d[i], i, panels3d.length, titleDesc[i]);
    }

});



/* to increase the size of API boxes when hovering */
function animatePanel(numberOfPanels, panel, index, maxIndex, titleDesc){
    var maxTime = 70*numberOfPanels;
    var waitTime = (index/maxIndex)*maxTime;
    if(waitTime < 70){
        waitTime = 70;
    }
    setTimeout(function(){
        panel.style.transform += " perspective(2000px) rotateY(0deg) scaleX(1) scaleY(1) ";
        addHooverFunction(titleDesc);
    }, waitTime);
}


function addHooverFunction(titleDesc){
    titleDesc.addEventListener("mouseenter", function(){
        titleDesc.style.transformOrigin = "50% 50%";
        titleDesc.style.transform = " scale(1.15) ";
    }, true);

    titleDesc.addEventListener("mouseleave", function(){
        titleDesc.style.transform = " scale(1) ";
    });
}
