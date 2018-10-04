<?php

class registerUser{
	function validUsername($name){
		$name = htmlspecialchars($name);
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$sql = "SELECT * from `user` WHERE `User_name`='$name'";

		$result = $conn->query($sql);
		if($result->num_rows > 0){
			return false;
		}

		return true;
	}

	function validEmail($email){
		$email = htmlspecialchars($email);
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$sql = "SELECT * from `user` WHERE `Email`='$email'";

		$result = $conn->query($sql);
		if($result->num_rows > 0){
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


	function addNewUser($name, $email, $password, $firstName, $lastname){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$userPasswordHash = password_hash($password, PASSWORD_DEFAULT);

		$sql = "INSERT INTO `user` (ID, User_name, User_pass, Email, firstname, lastname) VALUES (null, '$name', '$userPasswordHash', '$email', '$firstName', '$lastname')";

		try{
			$conn->query($sql);


			return $sql;
		}catch(Exception $e){
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