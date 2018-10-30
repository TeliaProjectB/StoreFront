<div id="helpWindow">
	
        <div id="contact1" class="strongButtonPanel" onclick="openContact(this.id)" style="margin-bottom:15px">
			<p>Phone</p>
		</div>
        <div class="contactInfoTelia" id="contactInformation1">
            <p>Fridays 08:00 - 19:00</p>
            <p> Phone number: 90 200</p>
            <p>From abroad: +46 771 99 02 00</p>
        </div>	
		
		<!-- not used 	
        <div class="contactInfoTelia" id="contactInformation2">
			<p>Open Twentyfour Seven</p>
			<p>From Telia mobile subscription / other phone</p>
			<p>Phone number: 455/454</p>
			<p>From abroad: +46 771 41 10 00</p>
		</div> 
		<br> -->
		<div id="contact3" class="strongButtonPanel" onclick="openContact(this.id)">
			<p>Chat</p>
		</div>
        <div class="contactInfoTelia" id="contactInformation3">
            <p>Today: 08:00 - 19:00</p>
			<p>Tomorrow: 08:00 - 19:00</p>
		</div>
		

	<div id="mainQuestions">
		<h3>Main Questions</h3>
		<a href="javascript:void();" onclick="openAnswer(this.id)" class="questionText" id="question1"></a>
		<div class="answerText" id="answer1"></div>
		<a href="javascript:void();" onclick="openAnswer(this.id)" class="questionText" id="question2"></a>
		<div class="answerText" id="answer2"></div>
		<a href="javascript:void();" onclick="openAnswer(this.id)" class="questionText" id="question3"></a>
		<div class="answerText" id="answer3"></div>
		<a href="javascript:void();" onclick="openAnswer(this.id)" class="questionText" id="question4"></a>
		<div class="answerText" id="answer4"></div>
		<a href="javascript:void();" onclick="openAnswer(this.id)" class="questionText" id="question5"></a>
		<div class="answerText" id="answer5"></div>
	</div>

	<!-- change with Telia email -->
	<a href="mailto:grwe1400@student.miun.se?Subject=Hello%20again" target="_top" id="sendEmail">Send Mail</a>

    
    <button class="closePanelButton" onclick="openHelpWindow()"></button>
</div>
