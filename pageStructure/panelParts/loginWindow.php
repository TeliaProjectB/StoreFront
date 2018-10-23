<div id="firstStep">
	<button class="bottomBoxSignIn"  onclick="openLoginWindow()">Sign in</button>
	<br>
	<button class="bottomBoxSignIn" onclick="openRegisterWindow()">Register</button>
	<button class="closeLoginButton" onclick="closeLoginWindow()"></button>
</div>

<div id="loginWindow">
	<p>Email</p>
	<input name="email" id="email" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Password</p>
	<input name="password" id="password" class="inputBoxSignIn inputBoxSignIn-text" type="password">
	<br>
						
	<button class="bottomBoxSignIn" onclick="checkUser()">Sign in</button>
	<br>
	<button class="bottomBoxSignIn" onclick="goBackToStart()">Go back</button>


	<button class="closeLoginButton" onclick="closeLoginWindow()"></button>
</div>



<div id="register">
	
	<p>First name</p>
	<input name="firstname" id="registerFirstname" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Last name</p>
	<input name="lastname" id="registerLastname" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Email</p>
	<input name="email" id="registerEmail" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Password</p>
	<input name="password" id="registerPassword"  class="inputBoxSignIn inputBoxSignIn-text" type="password">
	<p id="uppercase_activated">
	<br>

	<div id="errorMessagePanel" style="color:red;"></div>

	<input type="checkbox" id="agreedToTerms" style="display: block; margin: 0px auto; width: 16px;">
	<span>I agree to the </span><a href="/StoreFront/terms.php" style="color: blue; font-style: italic;">terms</a><span> and services.</span>
	<button onclick="registerUser()" id="panelButton">Register</button>

	<button class="bottomBoxSignIn" onclick="goBackToStart()">Go back</button>
	<button class="closeLoginButton" onclick="closeLoginWindow()"></button>
</div>
