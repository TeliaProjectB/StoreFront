
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

<div class="bigBoxesCategories" name="Most liked" id="mostLikedCategories" maximum="3"></div>

<div id="callCategory" class="contentRow" name="Call"></div>
<div id="smsCategory" class="contentRow" name="SMS"></div>

<div class="bigBoxesCategories" name="For new started company" id="Call" maximum="6"></div>

<div id="recommendedCategory" class="contentRow" name="Recommended"></div>
<div id="funCategory" class="contentRow" name="Fun"></div>

<div class="bigBoxesCategories" name="Most bought" id="mostBoughtCategory" maximum="3"></div>

<div id="mobileCategory" class="contentRow" name="Mobile"></div>
<div id="StatisticsAPICategory" class="contentRow" name="Statistics API"></div>

<div id="allCategory" class="contentRow" name="All"></div>
