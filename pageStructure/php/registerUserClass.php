<?php

class registerUser{
	
	function validEmail($email){
		$email = htmlspecialchars($email);
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$sql = "SELECT * from `user` WHERE `Email`='$email'";

		$result = $conn->query($sql);
		if(mysqli_num_rows($result) > 0){
			return false;
		}

		return true;
	}

	function validPassword($password){
		$password = htmlspecialchars($password);
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';
		$allowedLetters = " ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö1234567890_@!#£&";

		if(strlen($password) < 6){
			return false;
		}

		for($i=0; $i<strlen($password)-1; $i++){
			$subString = substr($password, $i, 1);
			if(strpos($allowedLetters, $subString) === false){
				return false;
			}
		}

		return true;
	}


	function addNewUser($email, $password, $firstname, $lastname){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$userPasswordHash = password_hash($password, PASSWORD_DEFAULT);
		//echo $userPasswordHash;

		$sql = "INSERT INTO `user` (ID, User_pass, Email, Firstname, Lastname) 
		VALUES (null, '$userPasswordHash', '$email', '$firstname', '$lastname')";

		try{
			$conn->query($sql);


			return $sql;
		}catch(Exception $e){
			return false;
		}
	}


	function updatePassword($newPassword){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$userPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

		$sql = "UPDATE `user`SET `User_pass`='$userPasswordHash'";

		try{
			$conn->query($sql);


			return $sql;
		}catch(Exception $e){
			return false;
		}
	}


	function getInfoFromName($email){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$sql = "SELECT * from `user` where `Email`='$email'";

		$result = $conn->query($sql);

		$row = $result->fetch_assoc();

		return $row;
	}

}

?>
