<?php
    class getPackageAPI{
        function getFirstAPIPackage(){
            $returnPackageID = $this->returnAPIPackageID(1);

            
        }


        function returnAPIPackageID($insertID){
            require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	
			$sql = "SELECT * 
                FROM `APIpackage` 
                WHERE ID = 1";
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row['PackageID'];
        }


        function getAPIForAPackageID($packageID){

        }
    
        
    }
?>