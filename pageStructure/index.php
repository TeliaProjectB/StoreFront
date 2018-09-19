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

	<?php
		if(file_exists("customCss.php")){
	    	include "customCss.php";
	    }
	?>
</head>
<body>


    <div class="pageContentWrapper">
           
        <div id="head">
			<div id="teliaIcon" onclick="window.open('/','_self')"></div>
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
			
			<button class="headerButton" onclick="openSlideInWindow()">Log in</button>
		</div>
		<div class="loginWindow">
			<div class="posisionOfTheloginWindow">
				<div id="firstStep">
					<button class="bottomBoxSignIn"  onclick="openLoginWindow()">Sign in</button>
					<button class="bottomBoxSignIn">Register</button>
				</div>
			
				<div id="loginWindow">
					<p>Username</p>
					<input class="inputBoxSignIn" type="text" id="username">

					<p>Password</p>
					<input class="inputBoxSignIn" type="password" id="password">
					<br>
					<button class="bottomBoxSignIn" onclick="checkUser()">Sign in</button>
				</div>

				<div id="signedIn">
					<a href="#" class="sidenavText">Account</a>
					<a href="#" class="sidenavText">Invoices</a>
					<a href="#" class="sidenavText">Payment</a>
					<a href="#" class="sidenavText">About</a>	
				</div>
			</div>
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
	<script type="text/javascript" src="/StoreFront/pageStructure/scripts/loginSlidingWindow.js"></script>
	<script type="text/javascript" src="/StoreFront/pageStructure/scripts/fancyPanels.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</body>
</html>