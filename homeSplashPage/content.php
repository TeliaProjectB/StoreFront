<div id="splash">
	
	<h1>Best Apple API</h1>
	<div id="container_info">
		<div id="left_info">
			<p><b>Price:</b> 5000 kr</p>
			<p><b>Category:</b> Fruit stuff</p>
			<p><b>Last updated:</b> 2018-02-31</p>
			<p><b>Rating:</b>
		<img id="rating" src="img/thumbs.png" />
		</div>
	
		<div id="info_API">
			<p>An apple is a sweet, edible fruit produced by an apple tree (Malus pumila). Apple trees are cultivated worldwide, and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe, and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek and European Christian traditions.
			
		</div>
		<!--
		<img src="img/apple.png" id="img" style="width:100px; height:100px; position:absolute; z-index:-1;background-color:rgb(255,255,255)">
		-->
		
		<div id="fruit"></div>
	</div>
</div>

<script type="text/javascript">
    window.onload = AnimateIt;
	function AnimateIt() {
    	var fruit = $("#fruit"),
        theContainer = $("#splash"),
        maxLeft = theContainer.width() - fruit.width(),
        maxTop = theContainer.height() - fruit.height(),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = Math.floor(Math.random() * maxTop);
    
    if (fruit.position().left < leftPos) {
        fruit.removeClass("left").addClass("right");
    } else {
        fruit.removeClass("right").addClass("left");
    }
        
    fruit.animate({
        "left": leftPos,
        "top": topPos
    }, 2500, AnimateIt);
}
AnimateIt();


</script>