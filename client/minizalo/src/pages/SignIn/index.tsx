import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignIn.css";

export const SignIn: FC = () => {
  return (
    <div className="box">
      <div className="signin">
        <h1 className="signin-heading">SIGN IN</h1>
        <div className="signin-field">
          <form action="/signin" className="signin-form">
            <input
              type="text"
              id="name"
              className="signin-input"
              placeholder=" "
              required
            />
            <label htmlFor="name" id="name-label" className="signin-label">
              Username
            </label>
            <p className="space"></p>
            <input
              type="password"
              id="pass"
              className="signin-input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" id="pass-label" className="signin-label">
              Password
            </label>
            <Box sx={{ height: 25 }} />
            <Button
              type="submit"
              variant="contained"
              className="signup-submit"
              color="success"
            >
              SIGN IN
            </Button>
          </form>
        </div>
        <div className="txt-center">
          <Box sx={{ height: 15 }} />
          <Button href="/" variant="outlined" className="signup-submit">
            BACK
          </Button>
          <Box sx={{ height: 15 }} />
          Have no account?
          <Button href="/signup" color="error">
            Sign up now !!
          </Button>
        </div>
      </div>
    </div>
  );
};
