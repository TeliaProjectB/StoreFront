<?php
    class getPackageAPI{
        function returnAPIPackageFromID(){
            require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	
			$sql = "SELECT * 
                FROM `APIpackage` 
                ORDER BY `PackageID` 
                ASC 
                LIMIT 3";
	
			$result = $conn->query($sql);

	
			return $result;
        }      
    }
?>