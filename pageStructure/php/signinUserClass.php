<?php

class signinUser{
    function checkUser($name, $password){
		require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

		$userPasswordHash = password_hash($password, PASSWORD_DEFAULT);
		$sql = "SELECT * FROM `user` WHERE User_name = '$name' AND User_pass = '$password'";

		try{
			$conn->query($sql);
            return $sql;
            
		}catch(Exception $e){
			return false;
		}
	}
?>