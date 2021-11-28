import { useState, useEffect } from "react";

// Custom hook to return and set current entered pathname in session storage
// Use in sign in and sign up pages to redirect users back to their current entered page when they refresh
export const useRedirect = () => {
  const [pathname, setPathname] = useState("/dashboard");

  const getPathnameHandler = () => {
    if (!sessionStorage.getItem("pathname")) {
      sessionStorage.setItem("pathname", pathname);
    }
    setPathname(sessionStorage.getItem("pathname") as string);
  };

  const setPathnameHandler = () => {
    if (window.location.pathname != "/")
      sessionStorage.setItem("pathname", window.location.pathname);
  };

  useEffect(getPathnameHandler, []);

  return {
    pathname,
    setPathnameHandler,
  };
};
