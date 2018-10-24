<?php
    require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/category/php/categoryClass.php';

    $categoryClass = new getCategoryClass;
	$mostBought = $categoryClass->getMostLikedID();


	$arrOfApi1 = array();
	foreach($mostBought as $idAPI){
		$result = $categoryClass->getAPIFromRandomID($idAPI["ItemID"]);
		
		$isAPackage = false;
		if(mysqli_num_rows($result) > 0){
			$row = $result->fetch_assoc();
		}
		else{
			$row = $categoryClass->getAPIPackageFromRandomID($idAPI["ItemID"]);
			$isAPackage = true; 
		}

		$newObj1 = new apiObject;
		$newObj1->Id = $row["Id"];
		$newObj1->RandomId = $row["RandomId"];
		$newObj1->Name = $row["Name"];
		$newObj1->Description = $row["Description"];
		$newObj1->Category = $row["Category"];
		$newObj1->Price = $row["Price"];
		$newObj1->imgName = $row["ImgName"];
		$newObj1->relevance = 0;
		$newObj1->isPackage = $isAPackage;
    
    
        array_push($arrOfApi1, $newObj1);
	}


    echo json_encode($arrOfApi1);  
?>