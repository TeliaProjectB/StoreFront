<?php

class containerObject{
	public $id = "";
	public $objectData = "";
	public $relevance = 0;
}

class filterManager{
	private $container  = array();


	function calculateRelevance($haystack, $needle){
		return substr_count($haystack, $needle);
	}
	

	function addObject($objectId, $objectData, $haystack, $needle){
		//echo "\"".$needle."\"\n";
		//If object to insert is not inserted, instert it. otherwise a counter for the object is incremented

		//Check if object already exists
		$exists = false;
		foreach($this->container as $obj){
			//echo "if ".$obj->id." == ".intval($objectId)."\n";
			if($obj->id == intval($objectId)){
				//echo "Match\n";
				$exists = true;
				$obj->relevance += $this->calculateRelevance($haystack, $needle);
				break;
			}
		}

		if(!$exists){
			$newContainerObj = new containerObject;
			$newContainerObj->id = intval($objectId);
			$newContainerObj->objectData = $objectData;
			$newContainerObj->relevance = $this->calculateRelevance($haystack, $needle);


			array_push($this->container, $newContainerObj);
		}

	}


	function getContainer(){
		usort($this->container, function($a, $b){
		    if ($a->relevance == $b->relevance) {
		        return 0;
		    }
		    return ($b->relevance < $a->relevance) ? -1 : 1;
		});

		return $this->container;
	}
}


?>