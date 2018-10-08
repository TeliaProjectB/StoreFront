<div id="firstStep">
	<button class="bottomBoxSignIn"  onclick="openLoginWindow()">Sign in</button>
	<br>
	<button class="bottomBoxSignIn" onclick="openRegisterWindow()">Register</button>
</div>

<div id="loginWindow">
	<p>Username</p>
	<input name="username" id="username" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Password</p>
	<input name="password" id="password" class="inputBoxSignIn inputBoxSignIn-text" type="password">
	<br>
						
	<button class="bottomBoxSignIn" onclick="checkUser()">Sign in</button>
	<br>
	<button class="bottomBoxSignIn" onclick="goBackToStart()">Go back</button>

</div>



<div id="register">
	<p>Username</p>
	<input name="username" id="registerName" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>First name</p>
	<input name="username" id="registerFirstname" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Last name</p>
	<input name="username" id="registerLastName" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Email</p>
	<input name="username" id="registerEmail" class="inputBoxSignIn inputBoxSignIn-text" type="text">

	<p>Password</p>
	<input name="password" id="registerPassword"  class="inputBoxSignIn inputBoxSignIn-text" type="password">
	<br>

	<div id="errorMessagePanel"></div>

	<input type="checkbox">I agree to the terms and services.</br>
	<button onclick="registerUser()" id="panelButton">Register</button>
</div>
