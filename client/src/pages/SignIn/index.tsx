import { FC, useState, useRef, FormEvent } from "react";
import { Button, Box, TextField, Alert } from "@mui/material";
import "./SignIn.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/UserSlice";

export const SignIn: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const user = useAppSelector(selectUser);

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
      const {
        data: { code, message },
      } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (code === "error") {
        setErrorMessage(message);
      } else if (code === "success") {
        setSuccessMessage(true);
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
        <div className="signin">
          {/* Sign in successful alert */}
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
              Glad to see you back, kkyler!
            </Alert>
          ) : null}

          {/* Sign in container */}
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
              <Box sx={{ height: 12 }} />
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
              <Box sx={{ height: 12 }} />
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
      )}
    </>
  );
};
