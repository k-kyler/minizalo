import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignIn.css";

export const SignIn: FC = () => {
  return (
	<div class="box">
		<div class="signin">
			<h1 class="signin-heading">SIGN IN</h1>
			<div class="signin-field">
				<form action="/signin" method="POST" class="signin-form">
					<input type="text" id="name" class="signin-input" placeholder=" " required/>
					<label for="name" id="name-label" class="signin-label">Username</label>
					<p class="space"></p>
					<input type="password" id="pass" class="signin-input" placeholder=" " required/>
					<label for="pass" id="pass-label" class="signin-label">Password</label>
					<Box sx={{height: 25}}/>
					<Button type="submit" variant="contained" className="signup-submit" color="success">SIGN IN</Button>
				</form>
			</div>
			<div class="txt-center">
				<Box sx={{height: 15}}/>
				<Button href="/" variant="outlined" className="signup-submit">BACK</Button>
				<Box sx={{height: 15}}/>
				Have no account?
				<Button href="/signup" color="error">Sign up now !!</Button>
			</div>
		</div>
	</div>
  );
};
