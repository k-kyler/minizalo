import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.style.css";
import { SignIn } from "pages/sign-in";
import { SignUp } from "pages/sign-up";
import { linkData } from "shared/link-data";
import { PrivateRoute } from "features/private-route";
import { CustomAlert, Navbar } from "features/ui";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchUser } from "redux/user.slice";
import { selectIsOpen } from "redux/alert.slice";

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
          <Route exact path="/signup" component={SignUp} />

          {/* Sign in endpoint */}
          <Route exact path="/" component={SignIn} />

          {/* Redirect back to dashboard if user gets into wrong routes */}
          <Redirect to="/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
