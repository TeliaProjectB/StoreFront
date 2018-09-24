
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
	<link rel="stylesheet" type="text/css" href="/StoreFront/MyAccount/css/Account.css">
	<link rel="stylesheet" type="text/css" href="/StoreFront/MyAccount/css/Account2.css">
	

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
				<p align="right"><button  class="headerButton"  onclick="openLoginWindow()">My Account</button>
				
			
			</div>
			<div class="loginWindow1">
				<div class="posisionOfTheloginWindow">
					<div id="firstStep">
					
					</div>
			
					<div id="loginWindow">
				
						<p align="right"><input type="button" class="bottomBoxSignIn" value="Information" onClick="showHideDiv1('divMsg1')"/>
						<p align="right"><input type="button" class="bottomBoxSignIn" value="Bought items" onClick="howHideDiv2('ivMsg2')"/>
						<p align="right"><input type="button" class="bottomBoxSignIn" value="Payment" onClick="owHideDiv3('vMsg3')"/>
						<p align="right"><input type="button" class="bottomBoxSignIn" value="Log out" onClick="showHideDiv('divMsg')"/>
						
						
	<div>	
	
<div id="ivMsg2"style="display:none" class="Table" >

<p class="three1">

    <div class="Title">
	
        
    </div>
    <div class="Heading">
        <div class="Cell">
            <p>API</p>
        </div>
		<div class="Cell">
            <p>Quantity</p>
        </div>
        <div class="Cell">
        <p>Descraption</p>
        </div>
        <div class="Cell">
            <p>Price</p>
        </div>
		 <div class="Cell">
            <p>Date</p>
        </div>
    </div>
    <div class="Row">
        <div class="Cell">
            <p>Row 1 Column 1</p>
        </div>
        <div class="Cell">
            <p>Row 1 Column 2</p>
        </div>
        <div class="Cell">
            <p>Voice-Message</p>
        </div>
		<div class="Cell">
            <p>Row 1 Column 4</p>
        </div>
		<div class="Cell">
            <p>Row 1 Column 5</p>
        </div>
		
    </div>
    <div class="Row">
        <div class="Cell">
            <p>Row 2 Column 1</p>
        </div>
        <div class="Cell">
            <p>Row 2 Column 2</p>
        </div>
        <div class="Cell">
            <p>SMS-message</p>
        </div>
		<div class="Cell">
            <p>Row 2 Column 4</p>
        </div>
		<div class="Cell">
            <p>Row 2 Column 5</p>
        </div>
    </div>
</div>
</div>



<div id="divMsg1"style="display:none">

<p class="three">
<div id="myDIV">
<body>



   <p>Name:</p>
   <p>Lastname:</p>
   <p>E-mail:</p>
   <p>Phone:</p>
   <p>Country:</p>
   <p>Gender:</p>
   </body>
        </div>
    </div>
</div>
</div>




 
<div id="vMsg3"style="display:none">

<p class="three2">


<a href="#" class="button111">Credit card</a>
<a href="#" class="button111">Paypal</a>
      </div>
    </div>

		</div>
				</div>
			</div>
		

			<!--Real content end-->

		</div>
		<div class="footer">
		</div>

	
	    
		<script type="text/javascript" src="/StoreFront/MyAccount/scripts/Account.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/loginSlidingWindow.js"></script>
		<script type="text/javascript" src="/StoreFront/pageStructure/scripts/scrollDownFunction.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	</body>
</html>
