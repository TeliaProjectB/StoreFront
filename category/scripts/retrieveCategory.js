/* function to create the Api of a single category */
function createApiBox(apiContainer, apiData){
    apiContainer.setAttribute("mouseover", false);

    

    var newApi = document.createElement("div");
    newApi.className = "apiBox";
    newApi.onclick = function(){
        document.body.style.cursor = "wait";
        setTimeout(function(){
            window.open("/StoreFront/api/?id="+apiElement.getAttribute("myApiId"), "_self");
        }, 60);
    };

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

    titleDescContainer.appendChild(apiTitle);
    titleDescContainer.appendChild(apiIcon);
    titleDescContainer.appendChild(apiDescription);

    newApi.appendChild(titleDescContainer);
    apiContainer.appendChild(newApi);
    

    newApi.setAttribute("myApiId", apiData.RandomId);
    
    newApi.onclick = function(){
        document.body.style.cursor = "wait";
        setTimeout(function(){
            window.open("/StoreFront/api/?id="+newApi.getAttribute("myApiId"), "_self");
        }, 60);
    };
}

/* function to connect with retrieveCategory.php and the database */
function ajaxRequest(postData, phpSource, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", phpSource, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log(this.responseText);
            onLoad(this.responseText);
        }
    }
    xhr.send(postData); 

}

/*function to get URL name of the category */
function getURLVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){
                   return pair[1];
                }
       }
       return(false);
}

/*create the title of the category */
function createTitle() {
    var titleCat = document.getElementById("categoryTitle");
    

	titleCat.href = "/StoreFront/category?cat="+ getURLVariable("cat");
	
	titleCat.innerHTML= getURLVariable("cat").replace(/[&\/\\#,+()$~%20.'":*?<>{}]/g, ' ');
}

/*connect to database and create all api */
ajaxRequest("cat=" + getURLVariable("cat"), "/StoreFront/category/php/retrieveCategory.php", function(response){
    
    var retrievedData = JSON.parse(response);
    
    var container = document.getElementById("searchedCategory");

    createTitle();

    for(var i=0; i<retrievedData.length; i++){
        createApiBox(container, retrievedData[i]);
    }
       
});

