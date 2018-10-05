<?php

class signinUser{
    function checkUserFromSQL($name, $password){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		// AND User_pass = '$password'

		$sql = "SELECT * FROM `user` WHERE User_name = '$name'";

		try{
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();

			return password_verify($password , $row["User_pass"]); 
		}
		catch(Exception $e){
			return false;
		}

		
	}


	function getInfoFromName($userName){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$userPasswordHash = password_hash($password, PASSWORD_DEFAULT);

		$sql = "SELECT * from `user` where `User_name`='$userName'";

		$result = $conn->query($sql);

		$row = $result->fetch_assoc();

		return $row;
	}
}
?>