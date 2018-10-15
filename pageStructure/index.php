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
								
						<div id="helpWindow">
							<div id="infoTeliaUp">
								<p>© Telia Sverige AB 556430-0142<br>
								<p>Box 50077, 973 22 Luleå<br>
								<p>Säte: Stockholm
							</div>

							<div id="mainQuestions">
								<a href="#" onclick="openQuestion(this.id)" class="questionText" id="question1">
									How can I find all the API?</a>
								<div class="answerText" id="answer1">"There are two ways to find all the API's. You can
									search on the search bar, you can scroll down till the end or you can 
									click on the dropdown button others and then click on the button All."
								</div>
								<a href="#" onclick="openQuestion(this.id)" class="questionText" id="question2">
									How can I buy more APIs?</a>
								<div class="answerText" id="answer2">
									"To buy more API you can go to an API, click the button add to card and continue shopping.";
								</div>
								<a href="#" onclick="openQuestion(this.id)" class="questionText" id="question3">
									How can I change my account?</a>
								<div class="answerText" id="answer3">
									"If you want to change your account information you can click on your username 
									or your user icon and click on My account, then click on change information."
								</div>
								<a href="#" onclick="openQuestion(this.id)" class="questionText" id="question4">
									What are the accepted payment methods?</a>
								<div class="answerText" id="answer4">
									"You can pay the API with Mastercard, Visa or American Express." 
								</div>
								<a href="#" onclick="openQuestion(this.id)" class="questionText" id="question5">
									How can I find an API that there isn't on the site?</a>
								<div class="answerText" id="answer5">
									"You can search on the search bar if the API is in the website, if there isn't
									you can send an email to Telia Service Center and we will add it if possible." 
								</div>
							</div>
							<button class="closeWindowButton" onclick="openHelpWindow()"></button>
						</div>
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
