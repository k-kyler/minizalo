import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignUp.css";

export const SignUp: FC = () => {
  return (
    <div className="box">
      <div className="signup">
        <h1 className="signup-heading">SIGN UP</h1>
        <div className="signup-field">
          <form action="/signup" className="signup-form">
            <input
              type="text"
              id="name"
              className="signup-input"
              placeholder=" "
              required
            />
            <label htmlFor="name" id="name-label" className="signup-label">
              Username
            </label>
            <p className="space"></p>
            <input
              type="password"
              id="pass"
              className="signup-input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" id="pass-label" className="signup-label">
              Password
            </label>
            <p className="space"></p>
            <input
              type="password"
              id="cfmpass"
              className="signup-input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" id="cfmpass-label" className="signup-label">
              Confirm Password
            </label>
            <Box sx={{ height: 25 }} />
            <Button
              type="submit"
              variant="contained"
              className="signup-submit"
              color="error"
            >
              SIGN UP
            </Button>
            <Box sx={{ height: 20 }} />
            <Button href="/signin" variant="outlined" className="signup-submit">
              BACK
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
