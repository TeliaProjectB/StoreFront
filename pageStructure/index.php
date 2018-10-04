<?php 
	/* Main page with two forms: sign up and log in */
	require 'php/db.php';
	session_start();
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
					
					<div id="showUsername"></div>
					<button id="userIcon" onclick="openSlideInWindow()"></button>
				</div>

				<!-- SECOND HEADER -->
				<div id="secondHead" class="secondHeader">
					<button class="headerButton" onclick="scrollDownTo('topListCategory')">Top list</button>	
					<button class="headerButton" onclick="scrollDownTo('freeCategory')">Free</button>
					<button class="headerButton" onclick="scrollDownTo('recommendedCategory')">Recommended</button>
					<button class="headerButton" onclick="scrollDownTo('mostRecentCategory')">Most recent</button>		
					<div class="dropdown" onmouseenter="openCloseDropdown()" onmouseleave="openCloseDropdown()">
						<button class="dropbtn">Others</button>
						<div class="dropdown-content">
							<button class="dropdownButton" onclick="scrollDownTo('paidCategory')">Paid</button>
							<button class="dropdownButton" onclick="scrollDownTo('mostBoughtCategory')">Most bought</button>
							<button class="dropdownButton" onclick="scrollDownTo('mostLikedCategory')">Most liked</button>
							<button class="dropdownButton" onclick="scrollDownTo('allCategory')">All</button>
						</div>
					</div> 
				
					<div id="searchBar"><input type="text"><div id="searchIcon"></div></div>
					<div id="helpContact" onclick="openHelpWindow()"></div>
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
						<div id="firstStep">
							<button class="bottomBoxSignIn"  onclick="openLoginWindow()">Sign in</button>
							<button class="bottomBoxSignIn" onclick="openRegisterWindow()">Register</button>
						</div>
				
						<form id="loginWindow">
							<p>Username</p>
							<input name="username" id="username" class="inputBoxSignIn inputBoxSignIn-text" type="text">

							<p>Password</p>
							<input name="password" id="password" class="inputBoxSignIn inputBoxSignIn-text" type="password">
							<br>
						
							<button class="bottomBoxSignIn" onclick="checkUser()">Sign in</button>
							<button class="bottomBoxSignIn" onclick="goBackToStart()">Go back</button>

						</form>

						<div id="signedIn">
							<a href="#" onclick="window.open('/StoreFront/myAccount?index=info','_self')" class="sidenavText">Account</a>
							<a href="#" onclick="window.open('/StoreFront/myAccount?index=boughtItems','_self')" class="sidenavText">Bought items</a>
							<a href="#" onclick="window.open('/StoreFront/myAccount?index=payment','_self')" class="sidenavText">Payment</a>
							<a href="#" onclick="goBackToStart()" class="sidenavText">Log out</a>	
						</div>
						
						<div id="register">
							<p>Username</p>
							<input name="username" id="registerName" class="inputBoxSignIn inputBoxSignIn-text" type="text">

							<p>First name</p>
							<input name="username" id="registerFirstname" class="inputBoxSignIn inputBoxSignIn-text" type="text">

							<p>Last name</p>
							<input name="username" id="registerLastName" class="inputBoxSignIn inputBoxSignIn-text" type="text">

							<p>Email</p>
							<input name="username" id="registerEmail" class="inputBoxSignIn inputBoxSignIn-text" type="text">

							<p>Password</p>
							<input name="password" id="registerPassword"  class="inputBoxSignIn inputBoxSignIn-text" type="password">
							<br>
							<input type="checkbox">I agree to the terms and services.</br>
							<button onclick="registerUser()">Register</button>
						</div>

						<button class="closeLoginButton" onclick="closeLoginWindow()"></button>
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
		
	</body>
</html>
