<script src="scripts/scrollChecker.js"></script>
<script src="scripts/fancyClicking.js"></script>
<script src="scripts/panelSwitcher.js"></script>
<!--<script src="scripts/sandboxCreator.js"></script>
<script>
	createSandbox("sandboxArea");
</script>-->
<script src="scripts/addToCart.js"></script>
<script src="scripts/handleLikeDislike.js"></script>
<script src="scripts/commentSystem/require.min.js"></script>

<!--<script data-main="scripts/commentSystem/main" src="scripts/commentSystem/require.min.js"></script>
<script data-main="component/swaggerDisplayer/code/main" src="component/swaggerDisplayer/code/require.min.js"></script>-->
<script  src="scripts/prettyFileSystem.min.js"></script>
<script>

	/*require(['video','content'], function(video, content){
	   video.start();
	   content.start();
	});*/
	require(['scripts/commentSystem/commentsMain']);
   	require(['scripts/apiSandbox/main']);
</script>