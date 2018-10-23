
<?php  

include $_SERVER["DOCUMENT_ROOT"]."/StoreFront/homeSplashPage/content.php";

?>

<div style="text-align: center;" id="onStartloading">
	<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>

<div id="topListCategory" class="contentRow" name="Top List"></div>
<div id="freeCategory" class="contentRow" name="Free"></div>

<div class="rowContainer">
	<a href="/StoreFront/category?cat=Combined%API's" class="rowTitle">Combined API's</a>
	<div class="simpleBoxContainer">
		
		<?php
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/home/php/getPackageAPI.php'; 
		?>
	</div>
</div>

<!-- 6 categories in home, then 12 at the end with only the box containing the title of category -->

<div id="callCategory" class="contentRow" name="Call"></div>
<div id="smsCategory" class="contentRow" name="SMS"></div>

<div class="bigBoxesCategories" name="Most liked" id="mostLikedCategories" maximum="3"></div>

<div id="funCategory" class="contentRow" name="Fun"></div>
<div id="mobileCategory" class="contentRow" name="Mobile"></div>

<div class="bigBoxesCategories" name="For new started company" id="newCompanyCategories" maximum="6"></div>

<div id="paymentCategory" class="contentRow" name="Payment"></div>
<div id="StatisticsAPICategory" class="contentRow" name="Statistics API"></div>

<div class="bigBoxesCategories" name="Most bought" id="mostBoughtCategory" maximum="3"></div>

<div id="employerCategory" class="contentRow" name="Employer"></div>
<div id="managementCategory" class="contentRow" name="Management"></div>

<div class="bigBoxesCategories" name="For company" id="companyCategories" maximum="6"></div>

<div id="cloudCategory" class="contentRow" name="Cloud"></div>

<div class="bigBoxesCategories" name="For industry" id="industryCategory" maximum="3"></div>

<div id="allCategory" class="contentRow" name="All"></div>


<!-- COMPLETE WITH SHOWING ALL THE SINGLE CATEGORIES IN BOXES -->