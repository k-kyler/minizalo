import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignUp.css";
import { Link } from "react-router-dom";

export const SignUp: FC = () => {
  return (
    <div className="signup">
      <div className="signup-container">
        <h1 className="signup-heading">SIGN UP</h1>
        <div className="signup-field">
          <form className="signup-form">
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
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined" className="signup-submit">
                BACK
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
