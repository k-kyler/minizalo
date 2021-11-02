import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignUp.css";

export const SignUp: FC = () => {
  return (
	<div class="box">
		<div class="signup">
			<h1 class="signup-heading">SIGN UP</h1>
			<div class="signup-field">
				<form action="/signup" method="POST" class="signup-form">
					<input type="text" id="name" class="signup-input" placeholder=" " required/>
					<label for="name" id="name-label" class="signup-label">Username</label>
					<p class="space"></p>
					<input type="password" id="pass" class="signup-input" placeholder=" " required/>
					<label for="pass" id="pass-label" class="signup-label">Password</label>
					<p class="space"></p>
					<input type="password" id="cfmpass" class="signup-input" placeholder=" " required/>
					<label for="pass" id="cfmpass-label" class="signup-label">Confirm Password</label>
					<Box sx={{height: 25}}/>
					<Button type="submit" variant="contained" className="signup-submit" color="error">SIGN UP</Button>
					<Box sx={{height: 20}}/>
					<Button href="/signin" variant="outlined" className="signup-submit">BACK</Button>
				</form>
			</div>
		</div>
	</div>
  );
};
