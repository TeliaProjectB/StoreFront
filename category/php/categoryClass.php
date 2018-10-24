<?php  
	class getCategoryClass{
        /***********************************
			Fetch the ID from most bought API
		***********************************/
		function getMostBoughtID(){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	
			$sql = "SELECT `ItemID`, COUNT(`ItemID`) AS `value_occurrence` 
				FROM     `boughtItems`
				GROUP BY `ItemID`
				ORDER BY `value_occurrence` 
                DESC 
                LIMIT    10;";
	
	
			$result = $conn->query($sql);
	
			return $result;
	
        }

        /***********************************
			Fetch the ID from the most liked API
		***********************************/
		function getMostLikedID(){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	
			$sql = "SELECT `ItemID`, COUNT(`ItemID`) AS `value_occurrence` 
				FROM     `APIlike`
				GROUP BY `ItemID`
				ORDER BY `value_occurrence` DESC
				LIMIT    10;";
	
	
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
	
			
			return $result;
        }

        /***********************************
			Fetch info about an API package by ID
		***********************************/
        function getAPIPackageFromID($insertIDpackage){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

			$refinedID = substr($insertIDpackage, 0, -1);
			
			$sql = "SELECT * 
				FROM `APIpackage` 
				WHERE `PackageID` = '$refinedID'";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row;
		}

        
        
        
        
        /***********************************
			Fetch info about an API by RandomID
		***********************************/
		function getAPIFromRandomID($insertrandomID){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
			
			$sql = "SELECT * 
				FROM `API` 
				WHERE RandomId = '$insertrandomID'";
	
	
			$result = $conn->query($sql);
            
            return $result;
		}


        
        /***********************************
			Fetch info about an API package by RandomID
		***********************************/
        function getAPIPackageFromRandomID($insertIDpackage){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

			$sql = "SELECT * 
				FROM `APIpackage` 
				WHERE `RandomId` = '$insertIDpackage'";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row;
        }
    }
?>