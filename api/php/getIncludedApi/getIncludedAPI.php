<?php

    require  $_SERVER["DOCUMENT_ROOT"].'/StoreFront/api/php/getIncludedApi/includedAPIClass.php';
    $includeAPI = new includeAPI;

    $allAPI = $includeAPI->getAllIncludedAPIFromID($apiPackageID);


    
    foreach($allAPI as $api){        
        
        $currentAPI = $includeAPI->getAPIFromID($api["APIID"]);


        $imgSrc = $currentAPI["ImgName"];
        
    
        $url = "/StoreFront/api/?id=".$currentAPI["RandomId"];

        echo "<div class='recApiCon' onclick='smartJsLink(\"".$url."\")'>
                    <div class='recApiTitle'>" . $currentAPI["Name"] . "</div>
                    <div class='recImgTxtCon'>
                        <div class='recApiImage' style='background-image:url(\" /StoreFront/globalImages/API/$imgSrc\")'></div>       
                        <div class='recApiText'>" . $currentAPI["Description"] . "</div>
                    </div>
                <div class='recApiPrice'>" . $currentAPI["Price"] . " kr</div>
            </div>";  
    }
?>