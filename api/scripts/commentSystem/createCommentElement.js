define([], function(){

	function initModule(messVars){

		this.createMessageElement = function(text, userName, messageSentDate, appendAsFirst, animate){
			messVars.messagesContainer.scrollTop = messVars.messagesContainer.scrollHeight;

			

			var newMessage = document.createElement("div");
			newMessage.className = "messageBoxMessage";

			var absoluteContainer = document.createElement("div");
			absoluteContainer.className = "messageBoxAbsoluteContainer";

			var nameTag = document.createElement("span");
			nameTag.className = "messageBoxNameTag";
			nameTag.innerHTML = userName +"  -  "+messageSentDate;
			absoluteContainer.appendChild(nameTag);

			var textContainer = document.createElement("div");
			textContainer.className = "messageBoxText";
			textContainer.innerHTML = text;
			absoluteContainer.appendChild(textContainer);



				
			newMessage.appendChild(absoluteContainer);
			messVars.loadedMessages++;

			if(appendAsFirst){
				messVars.messagesContainer.insertBefore(newMessage, messVars.messagesContainer.firstChild);
			}else{
				messVars.messagesContainer.appendChild(newMessage);
			}
			
				
			if(animate){
				absoluteContainer.style.maxHeight = "1080px";

				messVars.messagesContainer.scrollTop = messVars.messagesContainer.scrollHeight;

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


	}return{
		init: initModule
	}
});