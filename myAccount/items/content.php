

<link rel="stylesheet" type="text/css"  href="/StoreFront/myAccount/css/myAccount.css">
		<br>
		<div class="accordion vertical">
			<ul>
				<li>
				
	  
            <input type="checkbox" id="checkbox-1"  name="checkbox-accordion" /> 
			<label for="checkbox-1" >Information<div class="closeWindowButton12"></div></label>
            <div class="content">
		
			
   
	
<?php
require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

$sql = "SELECT * FROM user  WHERE `ID`=".$_SESSION["userId"]; ;

$result = $conn->query($sql);

if(!$result){
	echo "Invalid request";
}else{
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			
echo "<br>";
	
echo "<font size=\"4\" face='Helvetica' color='DimGray' >";  
echo " User_name: &nbsp;" .$row["User_name"] ."<br>";	
echo "<br>";
echo " Firstname: &nbsp;".$row["Firstname"]. "<br>";
echo "<br>";
echo " Lastname: &nbsp;".$row["Lastname"]. "<br>";
echo "<br>";
echo "  E-mail: &nbsp;".$row["Email"] . "</td> ";
echo "</font>";  		
		}
	} else {
		echo "0 results";
	}
}
?>

		</div>
            </li>
            <li>
			
		
					
<input type="checkbox" id="checkbox-2" name="checkbox-accordion" checked />
<label for="checkbox-2" >Bought-Items<div class="closeWindowButton12"></div></label>
<div class="content">
<table class="tableInfoBox">		
<br>
<?php
echo "<table border='1' cellspacing='2' >
<tr>

<th>Name</th>
<th>Description</th>
<th>Category</th>
<th>Price</th>
<th>ID</th>

</tr>";



require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

$sql = "SELECT * FROM boughtItems WHERE `UserId`=".$_SESSION["userId"];

$result = $conn->query($sql);

if(!$result){
	echo "Invalid request";
}else{
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {

		
			$sql = "SELECT * FROM API WHERE `Id`=".$row["ItemID"];

			$Presult = $conn->query($sql);

			if(!$Presult){
				echo "Invalid request";
			}else{
				if ($Presult->num_rows > 0) {
					// output data of each row
					while($Prow = $Presult->fetch_assoc()) {

						echo "<tr>";
	echo " <td>".$Prow["Name"] . "</td> ";
	echo " <td>".$Prow["Description"]. "</td> ";
	echo " <td>".$Prow["Category"] . "</td> ";
	echo " <td>".$Prow["Price"]. "</td> ";
	echo " <td>".$Prow["Id"]. "</td> ";
						
						"<br>";

					}
				}
			}
		}
	} else {
		echo "0 results";
	}
}


?>

</tr>
		</table>
        </div>
        </li>
        <li>


 

		
			
		
		
        
            <input type="checkbox" id="checkbox-3" name="checkbox-accordion"  />
           <label for="checkbox-3" >Payment<div class="closeWindowButton12"></div></label>
            <div class="content">
			  <a href="#" class="button headerButton3" >Credit card</a>
              <a href="#" class="button headerButton3">Paypal</a>
            </div>
           </li>
          <li>    
        </li>
       </ul>
</div>
</br>


