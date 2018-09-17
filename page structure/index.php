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
	<link rel="stylesheet" type="text/css" href="css/tagStyles.css">
	<link rel="stylesheet" type="text/css" href="css/panelStyles.css">
	<link rel="stylesheet" type="text/css" href="css/headerStyle.css">
	<link rel="stylesheet" type="text/css" href="css/footerFixer.css">
</head>
<body>

    <div class="pageContentWrapper">
           
        <div id="head">
			<div id="teliaIcon"></div>
			<button class="headerButton">Free</button>
			<button class="headerButton">Paid</button>
			<button class="headerButton">Apples</button>

			<div id="searchBar"><input type="text"><div id="searchIcon"></div></div>
			
			<button class="headerButton">Log in</button>
		</div>
    	<!--Real content start-->
		<div class="panel"><!--Example panel-->
			Content
		</div>
    	<!--Real content end-->

    </div>
    <div class="footer">
    </div>



</body>
</html>