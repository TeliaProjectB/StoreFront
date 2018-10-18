define(["scripts/commentSystem/ajaxFuncs", "scripts/commentSystem/createCommentElement"], function(ajaxFuncs, createCommentElement){

	function initModule(messVars){
		var ajaxF = new ajaxFuncs.init();
		var messageElementCreator = new createCommentElement.init(messVars);

		this.sendRootMessage = function(e){
			//Checks if textareas value contains something other than spaces and new lines.
			if(messVars.textArea.value.replace(/ /g, '').replace(/\n/g, '') !== ""){
				var fixedInput = messVars.textArea.value;
				fixedInput = fixedInput.replace(/[\r\n]+/g, "</br></br>");


				sendMessageToServer(fixedInput, function(messageData){
					//console.log(messageData);
					messageData = JSON.parse(messageData);
					var messagesOrder = messageData[1];
					var messageUserSender = messageData[0];
					var messageSentDate = messageData[2];

					if(messagesOrder !== false){
						messVars.endedAt = messagesOrder;

						messageElementCreator.createMessageElement(fixedInput, messageUserSender, messageSentDate, false, true);//This is a temporary solution, when php is up and running all
						//new messages will be created from "listenForNewMessages"

						messVars.textArea.value = "";
					}else{
						alert("An error occured");
					}
				});
			}
		}



		function sendMessageToServer(message, onLoad){
			//Use Ajax to send message to messages database
			//If everything went smoothly, return newly created messages order, otherwise return false.
			//onLoad(endedAt+1);
			ajaxF.ajaxRequest("mess="+message+"&apiId="+messVars.apiId, "/StoreFront/api/php/sendApiComment.php", function(response){
				//console.log(response.responseText);
				if(response.status == 200){
					onLoad(response.responseText);
				}
			});

		}





	}return{
		init: initModule
	}
});