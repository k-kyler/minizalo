import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="app">
      {/* General alert */}
      {isAlertOpen && <CustomAlert />}

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
