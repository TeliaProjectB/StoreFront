function createSandbox(elementName){
	var apiSource = "http://vitalkia.com/skola/apiExample.php";

	var element = document.getElementById(elementName);
	element.className = "sandbox";


	var outputElement = document.createElement("div");
	outputElement.className = "outPutElementSandbox";



	var inputContainer = document.createElement("div");
	inputContainer.style.display = "flex";
	inputContainer.style.flexDirection = "row";

	var inputElement = document.createElement("input");
	inputElement.style.display = "flex";
	inputElement.style.flex = "1";
	inputElement.style.backgroundColor = "#e8e8e8";
	inputElement.style.borderRadius = "5px";
	inputElement.style.margin = "8px";
	inputElement.style.padding = "4px";
	inputContainer.appendChild(inputElement);

	var inputButton = document.createElement("button");
	inputButton.innerHTML = "Submit";
	inputButton.className = "genericTeliaButton";
	inputButton.style.display = "flex";
	inputContainer.appendChild(inputButton);

	element.appendChild(outputElement);
	element.appendChild(inputContainer);


	function createSpanResponse(response){
		var span = document.createElement("div");
		span.innerHTML = response;
		span.className = "apiResponse";
		outputElement.appendChild(span);

		outputElement.scrollTop = outputElement.scrollHeight;
	}


	function requestToAPI(){
		createSpanResponse("No response");

		var xmlhttp;
		if (window.XMLHttpRequest) { // Mozilla, Safari
		    xmlhttp = new XMLHttpRequest();  
		} else if (window.ActiveXObject) { // IE 8 and older  
		    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");  
		}  


		var xhr = new XMLHttpRequest();
		xhr.open('POST', apiSource, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader("Content-Encoding", "gzip");
		xhr.onload = function () {
			console.log(xhr.responseText);
		    if (xhr.status == 200) {
		    	createSpanResponse(xhr.responseText);
		    }else{

		    }
		};

		xhr.send(inputElement.value);
	}


	inputButton.onclick = function(){
		requestToAPI();
	};

}