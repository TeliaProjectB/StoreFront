

<link rel="stylesheet" type="text/css"  href="/StoreFront/myAccount/css/myAccount.css">
		<br>
		<div class="accordion vertical">
			<ul>
				<li>
				
	  
            <input type="checkbox" id="checkbox-1"  name="checkbox-accordion" checked /> 
			<label for="checkbox-1" >Information<div class="closeWindowButton12"></div></label>
            <div class="content">
			<h1>Name</h1>
			<h1>LastName</h1>
			<h1>UserName</h1>
			<h1>Gender</h1>
			<h1>E-mail</h1>
			<h1>Company-ID</h1>
            </div>
            </li>
            <li>
			
   
		
		
					
<input type="checkbox" id="checkbox-2" name="checkbox-accordion" />
<label for="checkbox-2" >Bought-Items<div class="closeWindowButton12"></div></label>
<div class="content">
<table class="tableInfoBox">		
<br>
<?php
echo "<table border='1' cellspacing='2' >
<tr>
<th>Name</th>
<th>Description</th>
<th>Price</th>
<th>ID</th>
<th>Category</th>

</tr>";



require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/php/db.php';

$sql = "SELECT id, userid FROM boughtItems WHERE `UserId`=".$_SESSION["userId"];

$result = $conn->query($sql);

if(!$result){
	echo "Invalid request";
}else{
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {

			echo "ID: " . $row["id"]. " UserID: " . $row["userid"] ."<br>";
			$sql = "SELECT * FROM API WHERE `Id`=".$row["id"];

			$result = $conn->query($sql);

			if(!$result){
				echo "Invalid request";
			}else{
				if ($result->num_rows > 0) {
					// output data of each row
					while($row = $result->fetch_assoc()) {

						echo "<tr>";
echo " <td>".$row["Name"] . "</td> ";
echo " <td>".$row["Description"]. "</td> ";
echo " <td>".$row["Category"] . "</td> ";
echo " <td>".$row["Price"]. "</td> ";
echo " <td>".$row["id"]. "</td> ";
						
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


