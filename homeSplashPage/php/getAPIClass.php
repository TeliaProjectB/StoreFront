<?php  

	class getAPIClass{
		function getMostBoughtAPI(){
			$returnedID = $this->getMostBoughtID();
			$selectedAPI = $this->getAPIFromID($returnedID);
			
			return $selectedAPI;
		}

		function getMostLikedAPI(){
			$returnedRandomID = $this->getMostLikedID();
			$selectedAPIByRandomId = $this->getAPIFromRandomID($returnedRandomID);
			
			return $selectedAPIByRandomId;
		}




		/***********************************
			Fetch the ID from most bought API
		***********************************/
		function getMostBoughtID(){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
	
			$sql = "SELECT `ItemID`, COUNT(`ItemID`) AS `value_occurrence` 
				FROM     `boughtItems`
				GROUP BY `ItemID`
				ORDER BY `value_occurrence` DESC
				LIMIT    1;";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row['ItemID'];
	
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
				LIMIT    1;";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row['ItemID'];
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

		/***********************************
			Fetch info about an API by RandomID
		***********************************/
		function getAPIFromRandomID($insertrandomID){
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
			
			$sql = "SELECT * 
				FROM `API` 
				WHERE RandomId = '$insertrandomID'";
	
	
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
	
			return $row;
		}

	}

?>
