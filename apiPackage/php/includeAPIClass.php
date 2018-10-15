<?php
    class includeAPI{        
        
        
    	/***********************************
			Fetch info about an API by ID
		***********************************/
		function getAllIncludedAPIFromID($insertID){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
			
			$sql = "SELECT * 
				FROM `APIpackageItem` 
				WHERE PackageID = '$insertID'";
	
	
            $result = $conn->query($sql);
            
			
			return $result;
        }
        

        /***********************************
			Fetch info about an API by ID
		***********************************/
		function getAPIFromID($insertID){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
			
			$sql = "SELECT * 
				FROM `API` 
				WHERE Id = '$insertID'";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row;
		}

    }

?>