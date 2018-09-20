<div id="splash">
	
	<h1>Best Apple API</h1>
	<div id="container_info">
		<div id="left_info">
			<p><b>Price:</b> 5000 kr
			<p><b>Category:</b> Fruit stuff
			<p><b>Last updated:</b> 2018-02-31
		</div>
	
		<div id="info_API">
			<p>An apple is a sweet, edible fruit produced by an apple tree (Malus pumila). Apple trees are cultivated worldwide, and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe, and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek and European Christian traditions.
			
		</div>
		<!--
		<img src="img/apple.png" id="img" style="width:100px; height:100px; position:absolute; z-index:-1;background-color:rgb(255,255,255)">
		-->
		<div id="ball"></div>
	</div>
</div>

<script type="text/javascript">
        window.onload = AnimateIt;
		function AnimateIt() {
    var theDiv = $("#ball"),
        theContainer = $("#splash"),
        maxLeft = theContainer.width() - theDiv.width(),
        maxTop = theContainer.height() - theDiv.height(),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = Math.floor(Math.random() * maxTop);
    
    if (theDiv.position().left < leftPos) {
        theDiv.removeClass("left").addClass("right");
    } else {
        theDiv.removeClass("right").addClass("left");
    }
        
    theDiv.animate({
        "left": leftPos,
        "top": topPos
    }, 1200, AnimateIt);
}
AnimateIt();


</script>