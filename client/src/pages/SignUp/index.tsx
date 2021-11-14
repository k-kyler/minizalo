import { FC, useRef, FormEvent, useState } from "react";
import { Button, Box, TextField, Alert } from "@mui/material";
import "./SignUp.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/UserSlice";

export const SignUp: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const history = useHistory();

  const user = useAppSelector(selectUser);

  const signUpHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;
    const createdAt = new Date().toISOString();

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

    if (password === passwordConfirm && password.length < 6) {
      setErrorMessage("Passwords must be at least 6 characters");
      return;
    }

    setErrorMessage("");

    try {
      const {
        data: { code, message },
      } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        email,
        username,
        password,
        createdAt,
      });

      if (code === "error") {
        setErrorMessage(message);
      } else if (code === "success") {
        setSuccessMessage(true);

        setTimeout(() => {
          setSuccessMessage(false);
          history.push("/"); // redirect back to sign in page
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user.isFetching ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="signup">
          {/* Sign up successful alert */}
          {successMessage ? (
            <Alert
              onClose={() => setSuccessMessage(false)}
              sx={{
                position: "absolute",
                top: "2.5rem",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              You've registered successfully!
            </Alert>
          ) : null}

          {/* Sign up container */}
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
                    errorMessage.toLowerCase().includes("username") &&
                    errorMessage
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
                    errorMessage.toLowerCase().includes("password") &&
                    errorMessage
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
                    errorMessage.toLowerCase().includes("password") &&
                    errorMessage
                  }
                  inputRef={passwordConfirmRef}
                  type="password"
                  label="Confirm password"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
                <Box sx={{ height: 25 }} />

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
                <Box sx={{ height: 12 }} />
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
      )}
    </>
  );
};
