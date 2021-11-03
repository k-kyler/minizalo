import { FC } from "react";
import { Button, Box } from "@mui/material";
import "./SignIn.css";
import { Link } from "react-router-dom";

export const SignIn: FC = () => {
  return (
    <div className="signin">
      <div className="signin__container">
        <h1 className="signin__heading">SIGN IN</h1>
        <div className="signin__field">
          <form className="signin__form">
            <input
              type="text"
              className="signin__input name__input"
              placeholder=" "
              required
            />
            <label htmlFor="name" id="" className="signin__label name__label">
              Username
            </label>
            <Box sx={{ height: 25 }} />
            <input
              type="password"
              className="signin__input pass__input"
              placeholder=" "
              required
            />
            <label htmlFor="pass" id="" className="signin__label pass__label">
              Password
            </label>
            <Box sx={{ height: 25 }} />
            <Link style={{ textDecoration: "none" }} to="/dashboard">
              <Button
                type="submit"
                variant="contained"
                className="signin__submit"
                style={{ backgroundColor: "#6F28F9", color: "#FFFFFF" }}
              >
                SIGN IN
              </Button>
            </Link>
          </form>
        </div>
        <div className="text__center">
          <Box sx={{ height: 15 }} />
          <Button
            variant="outlined"
            className="signin__submit"
            style={{ backgroundColor: "#999999", color: "#FFFFFF" }}
          >
            BACK
          </Button>
          <Box sx={{ height: 15 }} />
          Have no account?
          <Link style={{ textDecoration: "none" }} to="/signup">
            <Button style={{ color: "#1B86F9" }}>Sign up now !!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
