import { FC } from "react";
import { Link, Redirect } from "react-router-dom";
import "./sign-in.style.css";
import { Button, Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { selectFriends } from "@redux/friends.slice";
import { FormTextField, MainLoading } from "@features/ui";
import { useRedirect } from "@hooks/use-redirect";
import { useAuth } from "@hooks/use-auth";

interface ISignInButton {
  isSignIn: boolean;
}

const SignInButton: FC<ISignInButton> = ({ isSignIn }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        width: "100%",
        borderRadius: "6px",
      }}
      className="signin__submit"
      startIcon={
        isSignIn && (
          <CircularProgress size={20} sx={{ color: "white", my: 0.282 }} />
        )
      }
    >
      {!isSignIn && <span>SIGN IN</span>}
    </Button>
  );
};

const HomeAndSignUpButtons = () => {
  return (
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
  );
};

export const SignIn: FC = () => {
  const user = useAppSelector(selectUser);
  const friends = useAppSelector(selectFriends);

  const { pathname } = useRedirect();
  const { signInHandler, errorMessage, emailRef, passwordRef } =
    useAuth("sign-in");

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
                <FormTextField
                  errorMessage={errorMessage}
                  ref={emailRef}
                  label="Email"
                  type="email"
                />
                <Box sx={{ height: 20 }} />
                <FormTextField
                  errorMessage={errorMessage}
                  ref={passwordRef}
                  label="Password"
                  type="password"
                />
                <Box sx={{ height: 40 }} />
                <SignInButton isSignIn={user.isSignIn} />
              </form>
            </div>

            <HomeAndSignUpButtons />
          </div>
        </div>
      ) : null}
    </>
  );
};
