requirejs(["loadMessages", "createCommentElement",
	"sendMessages", "ajaxFuncs"], function(loadMessages,
	createCommentElement, sendMessages, ajaxFuncs) {
	
	var ajaxF = new ajaxFuncs.init();

	var messVars = {
		loadedMessages: 0,
		messageBox: undefined,
		textArea: undefined,
		messagesContainer: undefined,
		hasLoadedMessagesFrom: undefined,
		endedAt: undefined,
		loadingMoreComments: undefined,
		loadingMessage: undefined,
		noMoreMessages: undefined,
		hasLoadedFirstBatchOfMessages: undefined,
		apiId: getParameterByName("id"),
		addLoadMoreMessagesModule: function(){
			if(messVars.loadingMessage === undefined){
				messVars.loadingMessage = document.createElement("div");
				messVars.loadingMessage.className = "messageBoxLoadingComment";
				messVars.loadingMessage.innerHTML = "Loading more comments...";
				messVars.loadingMessage.appendChild(spinnerElement);
			}

			messVars.messagesContainer.insertBefore(messVars.loadingMessage, messVars.messagesContainer.firstChild);
		},
	}


	var messageLoader = new loadMessages.init(messVars);
	var messageSender = new sendMessages.init(messVars);

	var spinnerElement = document.createElement("div");
	spinnerElement.innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

	//Init setup
	messVars.messageBox = document.getElementById("commentArea");
	fillContainerWithModules(messVars.messageBox);
	applyStyle(messVars.messageBox);
	messageLoader.loadMessagesOnStart();




	function getParameterByName(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return results[2].replace(/\+/g, " ");
	}



	function fillContainerWithModules(element){
		//Fix center content
		messVars.messagesContainer = document.createElement("div");
		messVars.messagesContainer.className = "messageBoxMessageContainer";

		messVars.addLoadMoreMessagesModule()
		//Fix bottom bar
		var bottomBar = document.createElement("div");
		bottomBar.className = "messageBoxBottomBar";

		messVars.textArea = document.createElement("textarea");
		messVars.textArea.className = "messageBoxTextArea";
		bottomBar.appendChild(messVars.textArea);


		var sendButton = document.createElement("button");
		sendButton.setAttribute("noFancyClicking", "true");
		sendButton.className = "genericTeliaButton";
		sendButton.innerHTML = "Send";
		sendButton.onclick = messageSender.sendRootMessage;
		bottomBar.appendChild(sendButton);

		userIsNotOnline(function(){
			messVars.textArea.value = "Register to be able to discuss this API :)";
			messVars.textArea.disabled = true;

			sendButton.innerHTML = "Register!";
			sendButton.onclick = function(){};

			sendButton.addEventListener("mouseup", function(){
				setTimeout(function(){
					var slidingLoginWindow = document.getElementsByClassName("loginWindow")[0];
					openSlideInWindow();
					openRegisterWindow();
				}, 32);
			});

		});

		//Fill container
		element.appendChild(messVars.messagesContainer);
		element.appendChild(bottomBar);
	}


	function applyStyle(element){
		element.className = "messageBox";
	}




	function userIsNotOnline(onLoad){
		ajaxF.ajaxRequest("", "/StoreFront/api/php/userIsOnline.php", function(response){
			if(response.status == 500){
				onLoad(true);
			}
		});
	}

	



	


	



	


});