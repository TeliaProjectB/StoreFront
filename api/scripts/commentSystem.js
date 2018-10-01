var firstBatchOfMessages = [
	{name: "Billy bob", message: "@Jhonny joe thank you now it works!", order: 9},
	{name: "Jhonny joe", message: "@Billy bob glad to help :)", order: 10},
	{name: "Sofia", message: "Thank you Telia for this API!", order: 11}
];


var secondBatchOfMessages = [
	{name: "Evan", message: "Really good API but sometimes the response time is really slow. Is it only me?", order: 0},
	{name: "Eva", message: "Really useful api!", order: 1},
	{name: "wfwy8bgiu", message: "nice", order: 2},
	{name: "Billy bob", message: "Can someone help me? I don't know which parameters I should use to communicate with is...", order: 3},
	{name: "Jhonny joe", message: "What have you tested? What results do you get?", order: 4},
	{name: "Chris", message: "I was able to create my own app thanks to this, check it out! www.example.com", order: 5},
	{name: "Billy bob", message: "@Jhonny joe I tested: www.apiSource.com&parameter=4345?p=hello", order: 6},
	{name: "Jhonny joe", message: "@Billy bob, you are mixing '&' and '?'. \n'?' always comes first and the later parameters are separated with '&'. So your url should look like this: www.apiSource.com?parameter=4345&p=hello", order: 7},
	{name: "Tony", message: "This api helped my team tremendously! ", order: 8},
];





function createMessageBox(id){
	var messageBox, textArea, messagesContainer, hasLoadedMessagesFrom, endedAt, 
	loadingMoreComments = false, loadingMessage, noMoreMessages,
	hasLoadedFirstBatchOfMessages = false;

	var spinnerElement = document.createElement("div");
	spinnerElement.innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

	var apiId = getParameterByName("APIID");

	//Init setup
	messageBox = document.getElementById(id);
	fillContainerWithModules(messageBox);
	applyStyle(messageBox);
	load10RecentMessages();
	//---

	function applyStyle(element){
		element.className = "messageBox";
	}

	function fillContainerWithModules(element){
		//Fix center content
		messagesContainer = document.createElement("div");
		messagesContainer.className = "messageBoxMessageContainer";

		addLoadMoreMessagesModule()
		//Fix bottom bar
		var bottomBar = document.createElement("div");
		bottomBar.className = "messageBoxBottomBar";

		textArea = document.createElement("textarea");
		textArea.className = "messageBoxTextArea";
		bottomBar.appendChild(textArea);

		var sendButton = document.createElement("button");
		sendButton.setAttribute("noFancyClicking", "true");
		sendButton.className = "genericTeliaButton";
		sendButton.innerHTML = "Send";
		sendButton.onclick = sendRootMessage;
		bottomBar.appendChild(sendButton);


		//Fill container
		element.appendChild(messagesContainer);
		element.appendChild(bottomBar);
	}


	function addLoadMoreMessagesModule(){
		if(loadingMessage === undefined){
			loadingMessage = document.createElement("div");
			loadingMessage.className = "messageBoxLoadingComment";
			loadingMessage.innerHTML = "Loading more comments...";
			loadingMessage.appendChild(spinnerElement);
		}

		messagesContainer.insertBefore(loadingMessage, messagesContainer.firstChild);
	}


	function load10RecentMessages(){
		//Load all messages that are connected to the api "apiId"
		//Data should be loaded as JSON in similar format to "firstBatchOfMessages"
		ajaxLoadMessages(false, 10, function(receivedMessages){
			hasLoadedMessagesFrom = receivedMessages[0].order;
			endedAt = receivedMessages[receivedMessages.length-1].order;
			for(var i=0; i<receivedMessages.length; i++){
				createMessageElement(receivedMessages[i].message, receivedMessages[i].name, false, false);
			}
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			hasLoadedFirstBatchOfMessages = true;

			startListeners();
		});
	}

	function load10MoreRecentMessages(onLoad){
		//Load 10 more messages up until "hasLoadedMessagesFrom"
		ajaxLoadMessages(hasLoadedMessagesFrom, 10, function(receivedMessages){

			if(receivedMessages !== false){
				setTimeout(function(){
					loadingMessage.parentElement.removeChild(loadingMessage);

					hasLoadedMessagesFrom = receivedMessages[receivedMessages.length-1].order;
					endedAt = receivedMessages[0].order;
					for(var i=receivedMessages.length; i!=0; i--){
						createMessageElement(receivedMessages[i-1].message, receivedMessages[i-1].name, true, false);
					}

					addLoadMoreMessagesModule();

					onLoad();
				}, 2000);
			}else{
				loadingMessage.parentElement.removeChild(loadingMessage);
				appendNoMoreMessages();
			}
			

		});
	}


	function appendNoMoreMessages(){
		if(noMoreMessages === undefined){
			noMoreMessages = document.createElement("div");
			noMoreMessages.className = "messageBoxLoadingComment";
			noMoreMessages.innerHTML = "...";


			messagesContainer.insertBefore(noMoreMessages, messagesContainer.firstChild);
		}
	}

	function ajaxLoadMessages(fromOrder, howMany, onRespons){
		//this is where ajax communicates with php to select comments
		if(fromOrder === false){//When fromOrder is false that means we want the 10 most recent messages
			firstBatchOfMessages.sort(sortMessages);
			onRespons(firstBatchOfMessages);
		}else if(fromOrder === 9){
			secondBatchOfMessages.sort(sortMessages);
			onRespons(secondBatchOfMessages);
		}else{
			onRespons(false);
		}
	}

	function sortMessages(a, b){
		return a.order - b.order;
	}

	function getParameterByName(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return results[2].replace(/\+/g, " ");
	}


	function sendRootMessage(e){
		//Checks if textareas value contains something other than spaces and new lines.
		if(textArea.value.replace(/ /g, '').replace(/\n/g, '') !== ""){
			var fixedInput = textArea.value;
			fixedInput = fixedInput.replace(/[\r\n]+/g, "</br></br>");


			sendMessageToServer(fixedInput, function(messagesOrder){
				if(messagesOrder !== false){
					endedAt = messagesOrder;

					createMessageElement(fixedInput, "User", false, true);//This is a temporary solution, when php is up and running all
					//new messages will be created from "listenForNewMessages"

					textArea.value = "";
				}else{
					alert("An error occured");
				}
			});
		}
	}


	function sendMessageToServer(message, onLoad){
		//Use Ajax to send message to messages database
		//If everything went smoothly, return newly created messages order, otherwise return false.
		onLoad(endedAt+1);
	}

	function createMessageElement(text, userName, appendAsFirst, animate){
		messagesContainer.scrollTop = messagesContainer.scrollHeight;

		

		var newMessage = document.createElement("div");
		newMessage.className = "messageBoxMessage";

		var absoluteContainer = document.createElement("div");
		absoluteContainer.className = "messageBoxAbsoluteContainer";

		var nameTag = document.createElement("span");
		nameTag.className = "messageBoxNameTag";
		nameTag.innerHTML = userName;
		absoluteContainer.appendChild(nameTag);

		var textContainer = document.createElement("div");
		textContainer.className = "messageBoxText";
		textContainer.innerHTML = text;
		absoluteContainer.appendChild(textContainer);

			
		newMessage.appendChild(absoluteContainer);

		if(appendAsFirst){
			messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
		}else{
			messagesContainer.appendChild(newMessage);
		}
		
			
		if(animate){
			absoluteContainer.style.maxHeight = "1080px";

			messagesContainer.scrollTop = messagesContainer.scrollHeight;

			/*setTimeout(function(){
				absoluteContainer.style.maxHeight = "1080px";

				//auto scrolls message container to bottom while css transision is taking place. Css transition takes 2 seconds
				for(var i=0; i<1000; i++){
					setTimeout(function(){
						messagesContainer.scrollTop = messagesContainer.scrollHeight;
					}, i);
				}
					
			}, 0);*/
		}else{
			absoluteContainer.style.transition = "";
			absoluteContainer.style.maxHeight = "1080px";
		}

		
	}




	function startListeners(){
		setTimeout(function(){
			setInterval(function(){
				listenForNewMessages();
				if(messagesContainer.scrollTop <= 128 && hasLoadedFirstBatchOfMessages && !loadingMoreComments){
					var previousScrollHeight = messagesContainer.scrollHeight;
					loadingMoreComments = true;
					load10MoreRecentMessages(function(){
						setTimeout(function(){
							messagesContainer.scrollTop = messagesContainer.scrollHeight - previousScrollHeight;
							loadingMoreComments = false;
						}, 100);
					});
				}
			}, 200);
		}, 500);
	}



	function listenForNewMessages(){
		//Here we make an ajax request to retrieve all newly created messages after order number "endedAt"

		var receivedMessages = [];//These are the messages we have retrieved

		if(receivedMessages.length !== 0){
			receivedMessages.sort(sortMessages);
			endedAt = receivedMessages[receivedMessages.length-1].order;
			for(var i=0; i<receivedMessages.length; i++){
				createMessageElement(receivedMessages[i].message, receivedMessages[i].name, false, false);
			}
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
		
	}
}