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
import { useAppSelector } from "./redux/hooks";

function App() {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <Navbar />
            <Dashboard />
          </Route>

          <Route exact path="/chat">
            <Navbar />
            <Chat />
          </Route>

          <Route exact path="/friends">
            <Navbar />
            <Friends />
          </Route>

          <Route exact path="/search">
            <Navbar />
            {/* Search component here... */}
          </Route>

          <Route exact path="/notifications">
            <Navbar />
            <Notifications />
          </Route>

          <Route exact path="/copyright">
            <Navbar />
            <Copyright />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
