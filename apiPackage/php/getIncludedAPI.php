<?php

    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/apiPackage/php/includeAPIClass.php';
    $includeAPI = new includeAPI;

    $allAPI = $includeAPI->getAllIncludedAPIFromID(1);


    
    foreach($allAPI as $api){        
        
        $currentAPI = $includeAPI->getAPIFromID($api["APIID"]);


        $imgSrc = getRealImageSrc($currentAPI["ImgName"]);
        
        echo "<div class='recApiCon' onclick='window.open(\"/StoreFront/api/?id=".$currentAPI["RandomId"]."\", \"_self\")'>
                <div class='recApiTitle'>" . $currentAPI["Name"] . "</div>
                <div class='recImgTxtCon'>
                    <div class='recApiImage' style='background-image:url(\" /StoreFront/globalImages/API/$imgSrc\")'></div>       
                    <div class='recApiText'>" . $currentAPI["Description"] . "</div>
                </div>
                <div class='recApiPrice'>" . $currentAPI["Price"] . " kr</div>
            </div>";  
    }
?>