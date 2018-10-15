<?php

class signinUser{
    function checkUserFromSQL($email, $sentPass){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		// AND User_pass = '$password'

		$sql = "SELECT * FROM `user` WHERE `Email` = '$email'";

			
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		/*if(password_verify($password, $row["User_pass"]) === true){
			return $row;
		}*/

		$hashedPass = $row["User_pass"];
		//echo strlen($hashedPass)."\n";
		//echo "hashedPass: ".$hashedPass."\n";
		//echo $sentPass;

		return password_verify($sentPass, $hashedPass);
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