<?php 
	/* Main page with two forms: sign up and log in */
	require 'php/db.php';
	//session_start(); we need this later
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/tagStyles.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/headerStyle.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/footerFixer.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/panelStyles.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/loginSlidingWindow.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/me.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/payment.css">

	

	<?php
		if(file_exists("customCss.php")){
	    	include "customCss.php";
	    }
	?>
</head>
<body>


    <div class="pageContentWrapper">
           
        <div id="head">
			<div onclick="window.open('/StoreFront/home/','_self')" id="teliaIcon"></div>
				
			<button class="headerButton">Free</button>
			<button class="headerButton">Paid</button>
			
			<div class="dropdown">
				<button class="dropbtn">Others</button>
				<div class="dropdown-content">
					<a href="#">Recommended</a>
					<a href="#">Paid</a>
					<a href="#">Most bought</a>
					<a href="#">Most recent</a>
					<a href="#">All</a>
				</div>
			</div> 

			<div id="searchBar"><input type="text"><div id="searchIcon"></div></div>
			
			<button class="headerButton" onclick="openSlideInWindow()">Account</button>
		</div>
		<div class="loginWindow">
			<div class="posisionOfTheloginWindow">
				<div id="firstStep">
				
				<p><button onclick="myFunction()" class="sidenavText" >My Account</button></p>
				<p><button onclick="youFunction()" class="sidenavText" >Bought items</button></p>
				<p><button onclick="weFunction()" class="sidenavText" >Payment</button></p>
				<p><button onclick="meFunction()" class="sidenavText" >Log out</button></p>
				

				</div>
			
				<div id="loginWindow">
					
					<button class="bottomBoxSignIn" onclick="checkUser()">Sign in</button>
				</div>

				<div id="signedIn">
					<a href="#" class="sidenavText">Account</a>
					<a href="#" class="sidenavText">Bought items</a>
					<a href="#" class="sidenavText">Payment</a>
					<a href="#" class="sidenavText">Log out</a>	
				</div>
			</div>
		</div>

<div id="myDIV">
<body>
<h1>Name:</h1>
<h1>Lastname:</h1>
<h1>Phone:</h1>
<h1>E-mail:</h1>
</body>
</div>



<div id="myDIV2">
<table class="blueTable">
<thead>
<tr>

<th>Items Number</th>
<th>Description</th>
<th>Price</th>
<th>Date</th>
<th>Time</th>
</tr>
</thead>

<colspan="4">

<tfoot>
</tfoot>
<tbody>
<tr>

<td>VoiceMessage</td>
<td>Apple-1</td>
<td>100$</td>
<td>2018-9-20</td>
<td>16:40</td>
</tr>

<td>SMS</td>
<td>Apple-1</td>
<td>100$</td>
<td>2018-9-20</td>
<td>16:40</td>
</tr>
<tr>
<td>CallMassage</td>
<td>Apple-2</td>
<td>100$</td>
<td>2018-9-20</td>
<td>16:40</td>
</tr>
<tr>
<td>IphoneVoice</td>
<td>Apple-3</td>
<td>100$</td>
<td>2018-9-20</td>
<td>16:40</td>
</tr>
<tr>
<td>CarVoice</td>
<td>Apple-4</td>
<td>100$</td>
<td>2018-9-20</td>
<td>16:40</td>
</table>


</div>
<div id="myDIV3">

 <?php
    if(file_exists("payment.php")){
    	include "payment.php";
    }
    ?>

</div>


		
		
		
		
		
    	<?php
    	if(file_exists("content.php")){
    		include "content.php";
    	}
    	
    	?>

    	<!--Real content end-->

    </div>
    <div class="footer">
    </div>

    <?php
    if(file_exists("scripts.php")){
    	include "scripts.php";
    }
    ?>
	

	
	<script type="text/javascript" src="/StoreFront/pageStructure/scripts/payment.js"></script>
	<script type="text/javascript" src="/StoreFront/pageStructure/scripts/me.js"></script>
	<script type="text/javascript" src="/StoreFront/pageStructure/scripts/loginSlidingWindow.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</body>
</html>
