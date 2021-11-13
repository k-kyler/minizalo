import { FC, useRef, FormEvent, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const SignUp: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const signUpHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;
    const createdAt = Date.now();

    if (!email) {
      setErrorMessage("Please fill in email");
      return;
    }

    if (!username) {
      setErrorMessage("Please fill in username");
      return;
    }

    if (!password || !passwordConfirm) {
      setErrorMessage("Please fill in passwords");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password === passwordConfirm && password.length < 8) {
      setErrorMessage("Passwords must be at least 8 characters");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post("/api/auth/register", {
        email,
        username,
        password,
        createdAt,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1 className="signup__heading">SIGN UP</h1>
        <div className="signup__field">
          <form className="signup__form" onSubmit={signUpHandler}>
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
              error={errorMessage.toLowerCase().includes("username")}
              helperText={
                errorMessage.toLowerCase().includes("username") && errorMessage
              }
              inputRef={usernameRef}
              type="text"
              label="Username"
              variant="outlined"
              sx={{ width: "100%" }}
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
            <TextField
              error={errorMessage.toLowerCase().includes("password")}
              helperText={
                errorMessage.toLowerCase().includes("password") && errorMessage
              }
              inputRef={passwordConfirmRef}
              type="password"
              label="Confirm password"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <Box sx={{ height: 30 }} />

            {/* Buttons */}
            <Button
              type="submit"
              sx={{
                width: "100%",
                borderRadius: "6px",
              }}
              variant="contained"
            >
              SIGN UP
            </Button>
            <Box sx={{ height: 15 }} />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "6px",
                }}
                variant="contained"
                className="signup__back"
              >
                BACK
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
