import { FC, useState, useRef, FormEvent } from "react";
import { Button, Box, TextField, CircularProgress } from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import "./SignIn.css";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchUser, selectUser, signInUser } from "../../redux/UserSlice";
import { openAlert } from "../../redux/AlertSlice";
import { selectFriends } from "../../redux/FriendsSlice";
import { MainLoading } from "../../components/Loadings/MainLoading";
import { useRedirect } from "../../hooks/useRedirect";

export const SignIn: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const user = useAppSelector(selectUser);
  const friends = useAppSelector(selectFriends);

  const dispatch = useAppDispatch();

  const { pathname } = useRedirect();

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
      const dispatchResult = await dispatch(
        signInUser({
          email,
          password,
        })
      ).unwrap();

      if (dispatchResult.code === "error") {
        setErrorMessage(dispatchResult.message);
      } else if (dispatchResult.code === "success") {
        dispatch(openAlert({ message: "Sign in successful!" }));
        dispatch(fetchUser());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user.isFetching ? (
        <Redirect to={pathname} />
      ) : user.isFetching &&
        !user.error &&
        friends.isFetching &&
        !friends.error ? (
        <MainLoading />
      ) : user.error ? (
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
                  variant="standard"
                  sx={{ width: "100%" }}
                  type="email"
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
                <Box sx={{ height: 40 }} />

                {/* Sign in button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    borderRadius: "6px",
                  }}
                  className="signin__submit"
                  startIcon={
                    user.isSignIn && (
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", my: 0.282 }}
                      />
                    )
                  }
                >
                  {!user.isSignIn && <span>SIGN IN</span>}
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
      ) : null}
    </>
  );
};
