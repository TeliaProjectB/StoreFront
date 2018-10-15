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
	<input name="username" id="registerFirstname" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Last name</p>
	<input name="username" id="registerLastName" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Email</p>
	<input name="username" id="registerEmail" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Password</p>
	<input name="password" id="registerPassword"  class="inputBoxSignIn inputBoxSignIn-text" type="password">
	<br>

	<div id="errorMessagePanel" style="color:red;"></div>

	<input type="checkbox">I agree to the terms and services.
	<button onclick="registerUser()" id="panelButton">Register</button>

	<button class="bottomBoxSignIn" onclick="goBackToStart()">Go back</button>
	<button class="closeLoginButton" onclick="closeLoginWindow()"></button>
</div>
