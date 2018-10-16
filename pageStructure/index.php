<?php 
	/* Main page with two forms: sign up and log in */
	require 'php/db.php';
	session_start();

	$Username = "";
	$items = "";
	$logged_check = false;

	if(isset($_SESSION["userId"])){
		$logged_check = true;
		$Username = $_SESSION["firstname"];
	}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="/StoreFront/structureFooter/footerStyle.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/tagStyles.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/headerStyle.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/secondHeaderStyle.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/footerFixer.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/panelStyles.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/loginSlidingWindow.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/helpSlidingWindow.css">
		<link rel="stylesheet" type="text/css" href="/StoreFront/pageStructure/css/breadcrumbs.css">

		<?php
			if(file_exists("customCss.php")){
				include "customCss.php";
			}
			
			
		?>
	</head>
	<body>
		<div class="pageContentWrapper">
			<div id="head" class="sticky">
				<!-- FIRST HEADER -->
				<div id="firstHead" class="firstHeader" onmouseenter="showSecondHeader()">
					<div onclick="window.open('/StoreFront/home/','_self')" id="teliaIcon"></div>
					
					<div id="showUsername"><?php echo $Username; ?></div>
					<button id="userIcon" onclick="openSlideInWindow()"></button>
				</div>

				<!-- SECOND HEADER -->
				<div id="secondHead" class="secondHeader">
					<button class="headerButton" onclick="scrollDownTo('Top List')">Top list</button>	
					<button class="headerButton" onclick="scrollDownTo('Free')">Free</button>
					<button class="headerButton" onclick="scrollDownTo('Recommended')">Recommended</button>		
					<button class="headerButton" onclick="scrollDownTo('Most liked')">Most liked</button>
					<div class="dropdown" ><!-- onmouseenter="openDropdown()" onmouseleave="closeDropDown()" -->
						<button class="headerButton" style="display:inline;">See more</button>
						<div class="dropdown-content">
							<button class="dropdownButton" onclick="scrollDownTo('Most bought')">Most bought</button>
							<button class="dropdownButton" onclick="scrollDownTo('SMS')">SMS</button>
							<button class="dropdownButton" onclick="scrollDownTo('Call')">Call</button>
							<button class="dropdownButton" onclick="scrollDownTo('For Company')">For Company</button>
							<button class="dropdownButton" onclick="scrollDownTo('Fun')">Fun</button>
							<button class="dropdownButton" onclick="scrollDownTo('Mobile')">Mobile</button>
							<button class="dropdownButton" onclick="scrollDownTo('Statistics API')">Statistics API</button>
					
						</div>
					</div> 
				
					<div id="searchBar"><input type="text" id="searchInput"><div id="searchIcon" onclick="filterApi()"></div></div>
					
					<?php 
						if(file_exists($_SERVER["DOCUMENT_ROOT"]."/StoreFront/pageStructure/php/checkAPI.php")){
							require $_SERVER["DOCUMENT_ROOT"]."/StoreFront/pageStructure/php/checkAPI.php";
						} 
					?>
					
					<div id="shoppingBag">
						<div id="itemCount" <?php if($logged_check && $items > 0) echo "style = 'display:block;'"; ?>><?php echo $items; ?></div> <!-- numbers of items in checkAPI.php -->
						<div id="trolley" onclick="window.location='/StoreFront/checkout/'" <?php if($logged_check) echo "style = 'display:flex'"?>></div>
					</div>

					<div id="helpContact" onclick="openHelpWindow()"></div>
				</div>

				<!-- THIRD HEADER / BREADCRUMBS -->
				<div id="thirdHead" class="thirdHeader">
					<ul class="breadcrumbs">
    					<li id="homeBreadcrumb" style="display:none;"><a href="/StoreFront/home/" id="firstPage">Home</a></li>
						<li><a href="" id="secondPage"></a></li>
					</ul>
				</div>
			</div>
			<!-- CONTENT -->
			<div class="content">
				<!-- HELP WINDOW -->
				<div class="helpWindow">
					<div class="posisionOfTheHelpWindow">
						<?php
							require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/panelParts/helpWindow.php';
						?>	
					</div>
				</div>


				<!-- LOGIN WINDOW -->
				<div class="loginWindow">
					<div class="posisionOfTheloginWindow">
						
						<?php
							if(isset($_SESSION["userId"]) === false){
								require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/panelParts/loginWindow.php';
							}else{
								require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/pageStructure/panelParts/signedIn.php';
							}
						?>
					</div>
				</div>
			
			
				<div id="contentID">
				
					<?php
						if(file_exists("content.php")){
							include "content.php";
						}
					?>
				</div>
			<!--Real content end-->
			</div>
		</div>
		<!-- FOOTER -->
		<div class="footer">
			<?php  
				include $_SERVER["DOCUMENT_ROOT"]."/StoreFront/structureFooter/content.php";
			?>
		</div>

		<?php
		if(file_exists("scripts.php")){
			include "scripts.php";
		}
		?>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/loginSlidingWindow.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/signinUser.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/scrollDownFunction.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/fixedHeader.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/helpSlidingWindow.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/registerUser.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/signOutUser.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/filterApiFunc.js"></script>
		
	</body>
</html>
