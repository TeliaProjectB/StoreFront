<button class="rowButton panelButtonBackground"  id="firstButton">Includes</button>
<button class="rowButton panelButtonBackground"  id="commentsButton">
	<div id="panelNumber">
	<?php echo $numberOfComments; ?>
	</div>Comments 
</button>
<button class="rowButton panelButtonBackground"  id="recommendedButton">
	<div id="panelNumber">
		<?php echo count($filterResult); ?>
	</div>Recommended
</button>