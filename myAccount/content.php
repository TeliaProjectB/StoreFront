<?php
	$whichwindowOpen = htmlspecialchars($_GET["index"]);
?>



	<link rel="stylesheet" type="text/css"  href="/StoreFront/myAccount/css/myAccount.css">	
	<button for="identifier-1"  onclick="myFunction()" class="contentMyAccountBox center accordion">&emsp;&emsp;&nbsp;Information </button>
	



	
		
			<?php
				if($whichwindowOpen == "info"){
					
				
			?>
			
 <div id= "contentMyAccount" class="contentMyAccount1"  >
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
  
echo"<div style ='font: 19px/35px Helvetica;color: #171010b3;'>";  
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
		
		</div>

	
	<?php
				}
			?>

	<p>

		
		<button onclick="Function()" class="contentMyAccountBox1 center accordion " >&emsp;&emsp;Bought items</button>
		<div class="content " >
		
     
			<?php
				if($whichwindowOpen == "boughtItems"){
					
			?>
			
<div class="contentMyAccount " id= "contentMyAccount2" >			
<table class="tableInfoBox">		


<?php
echo  "<table border='1' cellpadding='0' cellspacing='0' style='border-collapse: collapse' bordercolor='#111111' width='100%' id='AutoNumber1' >
<tr>
<th>ID</th>
<th>Category</th>
<th>Price</th>
<th>Name</th>
<th>Description</th>




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
	echo " <td>".$Prow["Id"]. "</td> ";	
	echo " <td>".$Prow["Category"] . "</td> ";
	echo " <td>".$Prow["Price"]. "</td> ";
	echo " <td>".$Prow["Name"] . "</td> ";
	echo " <td>".$Prow["Description"]. "</td> ";

	
						
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
       
			

	</P>
	
<?php
				}
				
			?>


			<p>

 
		    <button onclick="unction()" class="contentMyAccountBox2 center accordion " >&emsp;&emsp;Payment</button>
		
			<?php
				if($whichwindowOpen == "payment"){
			?>
			    <div id= "contentMyAccount3" class="contentMyAccount4">
			  <a href="#" class="button headerButton3" >Credit card</a>
              <a href="#" class="button headerButton3">Paypal</a>
            </div>
       
</div>
</br>
			<?php
				}
			?>
	
	</p>
			



		</div>	
<script type="text/javascript" src="/StoreFront/myAccount/scripts/myAccount.js"></script>	
			
			


