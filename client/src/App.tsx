import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Chat } from "./pages/Chat";
import { Friends } from "./pages/Friends";
import { Dashboard } from "./pages/Dashboard";
import { Notifications } from "./pages/Notifications";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Copyright } from "./pages/Copyright";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { PrivateRoute } from "./components/PrivateRoute";
import { fetchUser } from "./redux/UserSlice";
import { CustomAlert } from "./components/CustomAlert";
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
          {/* Dashboard */}
          <PrivateRoute
            exact
            path="/dashboard"
            component={() => (
              <>
                <Navbar />
                <Dashboard />
              </>
            )}
          />

          {/* Chat */}
          <PrivateRoute
            exact
            path="/chat"
            component={() => (
              <>
                <Navbar />
                <Chat />
              </>
            )}
          />

          {/* Friends */}
          <PrivateRoute
            exact
            path="/friends"
            component={() => (
              <>
                <Navbar />
                <Friends />
              </>
            )}
          />

          {/* Search */}
          <PrivateRoute
            exact
            path="/search"
            component={() => (
              <>
                <Navbar />
                {/* Search component here... */}
              </>
            )}
          />

          {/* Notifications */}
          <PrivateRoute
            exact
            path="/notifications"
            component={() => (
              <>
                <Navbar />
                <Notifications />
              </>
            )}
          />

          {/* Copyright */}
          <PrivateRoute
            exact
            path="/copyright"
            component={() => (
              <>
                <Navbar />
                <Copyright />
              </>
            )}
          />

          {/* Sign up */}
          <Route exact path="/signup">
            <SignUp />
          </Route>

          {/* Sign in */}
          <Route exact path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
