import { FormEvent, useRef, useState } from "react";
import { fetchUser, signInUser } from "@redux/user.slice";
import { useAppDispatch } from "@redux/hooks";
import { openAlert } from "@redux/alert.slice";

export const useAuth = (type: "sign-in" | "sign-up") => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

  if (type === "sign-in")
    return {
      signInHandler,
      errorMessage,
      emailRef,
      passwordRef,
    };
  return {};
};
