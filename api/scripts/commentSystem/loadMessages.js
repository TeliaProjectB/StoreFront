define(["scripts/commentSystem/ajaxFuncs", "scripts/commentSystem/createCommentElement"], 
	function(ajaxFuncs, createCommentElement){
	function initModule(messVars){
		var ajaxF = new ajaxFuncs.init();
		var messageElementCreator = new createCommentElement.init(messVars);



		this.loadMessagesOnStart = function(){
			//Load all messages that are connected to the api "apiId"
			//Data should be loaded as JSON in similar format to "firstBatchOfMessages"
			messVars.loadingMoreComments = true;
			ajaxLoadMessages(0, 0, function(receivedMessages, status){
				if(status == 200){
					if(receivedMessages != false){
						messVars.hasLoadedMessagesFrom = receivedMessages[0].order;
						messVars.endedAt = receivedMessages[receivedMessages.length-1].order;
						for(var i=0; i<receivedMessages.length; i++){
							messageElementCreator.createMessageElement(receivedMessages[i].message, 
								receivedMessages[i].name, receivedMessages[i].date, false, false);
						}
						messVars.messagesContainer.scrollTop = messVars.messagesContainer.scrollHeight;
						messVars.hasLoadedFirstBatchOfMessages = true;
					}
					

					startListeners();
				}else{
					try{
						messVars.loadingMessage.parentElement.removeChild(messVars.loadingMessage);
					}catch(e){}
					appendNoMoreMessages();

					startListeners();
				}
				messVars.loadingMoreComments = false;
			});
		}



		function ajaxLoadMessages(offset, fromIdOrder, onLoad){
			ajaxF.ajaxRequest("apiId="+messVars.apiId+"&offset="+offset+"&from="+fromIdOrder, "/StoreFront/api/php/loadApiComments.php", function(response){
				//console.log(response.responseText);
				if(response.status == 200){
					onLoad(JSON.parse(response.responseText), response.status);
				}else{
					onLoad(response.responseText, response.status);
				}
			});
		}


		function messageBoxIsVisible(){
			var commentArea = document.getElementById("commentArea")
			var areaParent = commentArea.parentElement;
			if(window.getComputedStyle(commentArea).getPropertyValue("display") == "none" || 
				window.getComputedStyle(areaParent).getPropertyValue("display") == "none"){
				return false;
			}
			return true;
		}


		function startListeners(){
			setTimeout(function(){

				listenForNewMessages(function(){
					if(messageBoxIsVisible()){
						if(messVars.messagesContainer.scrollTop <= 128){
							var previousScrollHeight = messVars.messagesContainer.scrollHeight;
							load10MoreRecentMessages(function(){
								messVars.messagesContainer.scrollTop = messVars.messagesContainer.scrollHeight - previousScrollHeight;
							});
						}
					}
					startListeners();
				});

			}, 20000);
		}



		function listenForNewMessages(onLoad){
			if(messVars.loadingMoreComments){
				return;
			}
			messVars.loadingMoreComments = true;
			//messVars.endedAt
			//Here we make an ajax request to retrieve all newly created messages after order number "messVars.endedAt"
			ajaxLoadMessages(0, messVars.endedAt, function(receivedMessages, status){
				if(status == 200){
					for(var i=0; i<receivedMessages.length; i++){
						var messagesOrder = receivedMessages[i].order;
						var messageUserSender = receivedMessages[i].name;
						var messageSentDate = receivedMessages[i].date;
						var messageText = receivedMessages[i].message;

						if(messagesOrder !== false){
							messVars.endedAt = messagesOrder;
							messageElementCreator.createMessageElement(messageText, messageUserSender, messageSentDate, false, true);//This is a temporary solution, when php is up and running all
							messVars.messagesContainer.scrollTop = messVars.messagesContainer.scrollHeight;
						}else{
							alert("An error occured");
						}
					}
					
				}
				messVars.loadingMoreComments = false;
				onLoad();
			});
			
		}



		function load10MoreRecentMessages(onLoad){
			if(messVars.loadingMoreComments){
				return;
			}
			messVars.loadingMoreComments = true;
			//Load 10 more messages up until "hasLoadedMessagesFrom"
			ajaxLoadMessages(messVars.loadedMessages, 0, function(receivedMessages, status){

				if(status == 200){
					if(receivedMessages.length > 0){
						messVars.loadingMessage.parentElement.removeChild(messVars.loadingMessage);

						messVars.hasLoadedMessagesFrom = receivedMessages[receivedMessages.length-1].order;
						//messVars.endedAt = receivedMessages[0].order;
						for(var i=receivedMessages.length; i!=0; i--){
							messageElementCreator.createMessageElement(receivedMessages[i-1].message, 
								receivedMessages[i-1].name, receivedMessages[i-1].date,
								true, false);
						}

						messVars.addLoadMoreMessagesModule();

						onLoad();
					}else{
						try{
							messVars.loadingMessage.parentElement.removeChild(messVars.loadingMessage);
						}catch(e){}
						appendNoMoreMessages();
					}
				}else{
					try{
						messVars.loadingMessage.parentElement.removeChild(messVars.loadingMessage);
					}catch(e){}
					appendNoMoreMessages();
				}
				
				messVars.loadingMoreComments = false;

			});
		}



		function appendNoMoreMessages(){
			if(messVars.noMoreMessages === undefined){
				messVars.noMoreMessages = document.createElement("div");
				messVars.noMoreMessages.className = "messageBoxLoadingComment";
				messVars.noMoreMessages.innerHTML = "...";


				messVars.messagesContainer.insertBefore(messVars.noMoreMessages, messVars.messagesContainer.firstChild);
			}
		}


	}return{
		init: initModule
	}
});