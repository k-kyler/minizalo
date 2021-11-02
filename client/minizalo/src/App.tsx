import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Friends } from "./pages/Friends";
import { Dashboard } from "./pages/Dashboard";
import { Notifications } from "./pages/Notifications";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div className="app">
      <Router>
        {/* Pages */}
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

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/">
            <SignIn />
          </Route>
        </Switch>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
