import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./App.css";
import { linkData } from "./constants/LinkData";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import { CustomAlert } from "./components/CustomAlert";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUser } from "./redux/UserSlice";
import { selectIsOpen } from "./redux/AlertSlice";

function App() {
  const dispatch = useAppDispatch();

  const isAlertOpen = useAppSelector(selectIsOpen);

  const [displayFloatButton, setDisplayFloatButton] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);

  const showFloatButtonHandler = () => {
    appRef.current && appRef.current.scrollTop !== 0
      ? setDisplayFloatButton(true)
      : setDisplayFloatButton(false);
  };

  const scrollToTopHandler = () => {
    appRef.current ? (appRef.current.scrollTop = 0) : null;
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="app" ref={appRef} onScroll={showFloatButtonHandler}>
      {/* General alert */}
      {isAlertOpen && <CustomAlert />}

      {/* Zoom button */}
      <Zoom in={displayFloatButton}>
        <Fab
          color="primary"
          className="search__scrollToTop"
          size="medium"
          onClick={scrollToTopHandler}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* Routes setup */}
      <Router>
        <Switch>
          {/* Private endpoints */}
          {linkData.map((link, index) => (
            <PrivateRoute
              key={index}
              exact
              path={link.pathname}
              component={() => (
                <>
                  <Navbar />
                  {link.Component}
                </>
              )}
            />
          ))}

          {/* Sign up endpoint */}
          <Route exact path="/signup">
            <SignUp />
          </Route>

          {/* Sign in endpoint */}
          <Route exact path="/">
            <SignIn />
          </Route>

          {/* Redirect if user gets into wrong routes */}
          <Redirect to="/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
