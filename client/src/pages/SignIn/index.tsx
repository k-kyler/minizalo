import { FC, useState, useRef, useEffect, FormEvent } from "react";
import { Button, Box, TextField } from "@mui/material";
import "./SignIn.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const SignIn: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [test, setTest] = useState({});

  const signInHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (!email) {
      setErrorMessage("Please fill in email");
      return;
    }

    if (!password) {
      setErrorMessage("Please fill in password");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <h1 className="signin__heading">SIGN IN</h1>
        <div className="signin__field">
          <form className="signin__form" onSubmit={signInHandler}>
            {/* Inputs */}
            <TextField
              error={errorMessage.toLowerCase().includes("email")}
              helperText={
                errorMessage.toLowerCase().includes("email") && errorMessage
              }
              inputRef={emailRef}
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              type="email"
            />
            <Box sx={{ height: 25 }} />
            <TextField
              error={errorMessage.toLowerCase().includes("password")}
              helperText={
                errorMessage.toLowerCase().includes("password") && errorMessage
              }
              inputRef={passwordRef}
              type="password"
              label="Password"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <Box sx={{ height: 25 }} />

            {/* Sign in button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "6px",
              }}
              className="signin__submit"
            >
              SIGN IN
            </Button>
          </form>
        </div>

        {/* Back to home & go to sign up buttons */}
        <div className="text__center">
          <Box sx={{ height: 15 }} />
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "6px",
            }}
            className="signin__back"
          >
            BACK
          </Button>
          <Box sx={{ height: 15 }} />
          Have no account?
          <Link style={{ textDecoration: "none" }} to="/signup">
            <Button
              sx={{ color: "#1976d2" }}
              variant="text"
              className="signin__goToSignUp"
            >
              Sign up now !!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
