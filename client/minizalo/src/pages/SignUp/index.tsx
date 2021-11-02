import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignUp.css";

export const SignUp: FC = () => {
  return (
    <div className="box">
      <div className="signup">
        <h1 className="signup__heading">SIGN UP</h1>
        <div className="signup__field">
          <form action="/signup" className="signup__form">
            <input
              type="text"
              className="signup__input name__input"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="signup__label name__label">
              Username
            </label>
            <Box sx={{ height: 25 }} />
            <input
              type="password"
              className="signup__input pass__input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" className="signup__label pass__label">
              Password
            </label>
            <Box sx={{ height: 25 }} />
            <input
              type="password"
              className="signup__input cfmpass__input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" className="signup__label cfmpass__label">
              Confirm Password
            </label>
            <Box sx={{ height: 25 }} />
            <Button
              type="submit"
              variant="contained"
              className="signup__submit"
              style={{backgroundColor: '#1B86F9', color: '#FFFFFF'}}
            >
              SIGN UP
            </Button>
            <Box sx={{ height: 20 }} />
            <Button href="/" variant="outlined" className="signup__submit" style={{backgroundColor: '#999999', color: '#FFFFFF'}}>
              BACK
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
