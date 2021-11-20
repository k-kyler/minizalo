import { FC, useRef, FormEvent, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import "./SignUp.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser, signUpUser } from "../../redux/UserSlice";
import { openAlert } from "../../redux/AlertSlice";
import { MainLoading } from "../../components/Loadings/MainLoading";

export const SignUp: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const signUpHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const userName = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;

    if (!email) {
      setErrorMessage("Please fill in email");
      return;
    }

    if (!userName) {
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
      const dispatchResult = await dispatch(
        signUpUser({
          email,
          userName,
          password,
        })
      ).unwrap();

      if (dispatchResult.code === "error") {
        setErrorMessage(dispatchResult.message);
      } else if (dispatchResult.code === "success") {
        dispatch(openAlert({ message: "Sign up successful!" }));

        setTimeout(() => {
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
      ) : user.isFetching && !user.error ? (
        <MainLoading />
      ) : user.error ? (
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
                  variant="standard"
                  sx={{ width: "100%" }}
                  type="email"
                />
                <Box sx={{ height: 20 }} />
                <TextField
                  error={errorMessage.toLowerCase().includes("username")}
                  helperText={
                    errorMessage.toLowerCase().includes("username") &&
                    errorMessage
                  }
                  inputRef={usernameRef}
                  type="text"
                  label="Username"
                  variant="standard"
                  sx={{ width: "100%" }}
                />
                <Box sx={{ height: 20 }} />
                <TextField
                  error={errorMessage.toLowerCase().includes("password")}
                  helperText={
                    errorMessage.toLowerCase().includes("password") &&
                    errorMessage
                  }
                  inputRef={passwordRef}
                  type="password"
                  label="Password"
                  variant="standard"
                  sx={{ width: "100%" }}
                />
                <Box sx={{ height: 20 }} />
                <TextField
                  error={errorMessage.toLowerCase().includes("password")}
                  helperText={
                    errorMessage.toLowerCase().includes("password") &&
                    errorMessage
                  }
                  inputRef={passwordConfirmRef}
                  type="password"
                  label="Confirm password"
                  variant="standard"
                  sx={{ width: "100%" }}
                />
                <Box sx={{ height: 40 }} />

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
      ) : null}
    </>
  );
};
