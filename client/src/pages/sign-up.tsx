import { FC } from "react";
import "./sign-up.style.css";
import { Link, Redirect } from "react-router-dom";
import { Button, Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { selectFriends } from "@redux/friends.slice";
import { FormTextField, MainLoading } from "@features/ui";
import { useRedirect } from "@hooks/use-redirect";
import { useAuth } from "@hooks/use-auth";

interface ISignUpButton {
  isSignUp: boolean;
}

const SignUpAndBackToSignInButtons: FC<ISignUpButton> = ({ isSignUp }) => {
  return (
    <>
      <Button
        type="submit"
        sx={{
          width: "100%",
          borderRadius: "6px",
        }}
        variant="contained"
        startIcon={
          isSignUp && (
            <CircularProgress size={20} sx={{ color: "white", my: 0.282 }} />
          )
        }
      >
        {!isSignUp && <span>SIGN UP</span>}
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
    </>
  );
};

export const SignUp: FC = () => {
  const user = useAppSelector(selectUser);
  const friends = useAppSelector(selectFriends);

  const { pathname } = useRedirect();
  const {
    signUpHandler,
    errorMessage,
    emailRef,
    usernameRef,
    passwordRef,
    passwordConfirmRef,
  } = useAuth("sign-up");

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
        <div className="signup">
          <div className="signup__container">
            <h1 className="signup__heading">SIGN UP</h1>
            <div className="signup__field">
              <form className="signup__form" onSubmit={signUpHandler}>
                <FormTextField
                  errorMessage={errorMessage}
                  errorType="email"
                  ref={emailRef}
                  label="Email"
                  type="email"
                />
                <Box sx={{ height: 20 }} />
                <FormTextField
                  errorMessage={errorMessage}
                  errorType="username"
                  ref={usernameRef}
                  label="Username"
                  type="text"
                />
                <Box sx={{ height: 20 }} />
                <FormTextField
                  errorMessage={errorMessage}
                  errorType="password"
                  ref={passwordRef}
                  label="Password"
                  type="password"
                />
                <Box sx={{ height: 20 }} />
                <FormTextField
                  errorMessage={errorMessage}
                  errorType="password"
                  ref={passwordConfirmRef}
                  label="Confirm password"
                  type="password"
                />
                <Box sx={{ height: 40 }} />
                <SignUpAndBackToSignInButtons isSignUp={user.isSignUp} />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
