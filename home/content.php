
<?php  

include $_SERVER["DOCUMENT_ROOT"]."/StoreFront/homeSplashPage/content.php";

?>

<div style="text-align: center;" id="onStartloading">
	<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>


<div id="topListCategory" class="contentRow" name="Top list"></div>
<div id="freeCategory" class="contentRow" name="Free"></div>

<div class="bigBoxesCategories" name="Most liked" id="mostLikedCategories" maximum="3"></div>

<!-- 6 categories in home, then 12 at the end with only the box containing the title of category -->

<!--<div id="managementCategory" class="contentRow" name="Management"></div>-->
<!--<div id="smsCategory" class="contentRow" name="SMS"></div>-->


<div id="combinedAPI" class="rowContainer" name="combinedAPI">
	<a href="/StoreFront/category?cat=Combined API" class="rowTitle">Combined API</a>
	<div class="simpleBoxContainer">
		
		<?php
			require $_SERVER["DOCUMENT_ROOT"].'/StoreFront/home/php/getPackageAPI.php'; 
		?>
	</div>
</div>

<div id="funCategory" class="contentRow" name="Fun"></div>

<div class="bigBoxesCategories" name="For new started company" id="newCompanyCategories" maximum="6"></div>

<div id="StatisticsAPICategory" class="contentRow" name="Statistics API"></div>

<div class="bigBoxesCategories" name="Most bought" id="mostBoughtCategory" maximum="3"></div>






<div id="allCategory" class="contentRow" name="All"></div>


<!-- COMPLETE WITH SHOWING ALL THE SINGLE CATEGORIES IN BOXES -->
