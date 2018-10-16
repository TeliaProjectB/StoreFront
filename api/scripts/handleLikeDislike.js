function clickLikeApi(apiRandId){
	ajaxRequest("/StoreFront/api/php/likeOrDislikeApi.php", "likeIt=1&apiRandId="+apiRandId, function(response){
		updateThumbs(response);
	});
}


function clickDislikeApi(apiRandId){
	ajaxRequest("/StoreFront/api/php/likeOrDislikeApi.php", "likeIt=0&apiRandId="+apiRandId, function(response){
		updateThumbs(response);
	});
}



function openRegisterPanel(){
	setTimeout(function(){
		var slidingLoginWindow = document.getElementsByClassName("loginWindow")[0];
		openSlideInWindow();
	}, 32);
}



function updateThumbs(serverResponse){
	removeLikedOrDisliked();
	var thumbsUp = document.getElementById("thumbsUp");
	var thumbsDown = document.getElementById("thumbsDown");

	thumbsUp.className = "thumbs";
	thumbsDown.className = "thumbs";

	var thumbsUpNumber = document.getElementById("thumbsUpNumber");
	var thumbsDownNumber = document.getElementById("thumbsDownNumber");


	
	if(serverResponse == "1"){
		//make like
		thumbsUp.className = "pressedThumbs";
		thumbsUpNumber.innerHTML = parseInt(thumbsUpNumber.innerHTML, 10)+1;
	}else if(serverResponse == "0"){
		//make dislike
		thumbsDown.className = "pressedThumbs";
		thumbsDownNumber.innerHTML = parseInt(thumbsUpNumber.innerHTML, 10)+1;
	}

	updateThumbsBar(thumbsUpNumber.innerHTML, thumbsDownNumber.innerHTML);
}

function removeLikedOrDisliked(){
	var thumbsUp = document.getElementById("thumbsUp");
	var thumbsDown = document.getElementById("thumbsDown");

	var thumbsUpNumber = document.getElementById("thumbsUpNumber");
	var thumbsDownNumber = document.getElementById("thumbsDownNumber");

	if(thumbsUp.className == "pressedThumbs"){
		thumbsUpNumber.innerHTML = Math.max(0, parseInt(thumbsUpNumber.innerHTML, 10)-1);
	}else if(thumbsDown.className == "pressedThumbs"){
		thumbsDownNumber.innerHTML = Math.max(0, parseInt(thumbsUpNumber.innerHTML, 10)-1);
	}
}


function updateThumbsBar(thumbsUpNum, thumbsDownNum){
	var ratioUp = document.getElementById("ratioUp");
	var ratioDown = document.getElementById("ratioDown");

	if(thumbsUpNum == 0 && thumbsDownNum == 0){
		thumbsUpNum = 1;
		thumbsDownNum = 1;
	}

	ratioUp.style.flex = thumbsUpNum;
	ratioDown.style.flex = thumbsDownNum;
}