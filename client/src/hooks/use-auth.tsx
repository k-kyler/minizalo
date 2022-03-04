import { FormEvent, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser, signInUser, signUpUser } from "redux/user.slice";
import { useAppDispatch } from "redux/hooks";
import { openAlert } from "redux/alert.slice";

export const useAuth = (type: "sign-in" | "sign-up") => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

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
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (type === "sign-in")
    return {
      signInHandler,
      errorMessage,
      emailRef,
      passwordRef,
    };
  return {
    signUpHandler,
    errorMessage,
    emailRef,
    usernameRef,
    passwordRef,
    passwordConfirmRef,
  };
};
