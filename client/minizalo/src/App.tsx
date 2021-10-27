import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Friends } from "./pages/Friends";
import { Home } from "./pages/Home";
import { Notifications } from "./pages/Notifications";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Page */}
        <Switch>
          <Route exact path="/chat">
            <Chat />
          </Route>

          <Route exact path="/friends">
            <Friends />
          </Route>

          <Route exact path="/search"></Route>

          <Route exact path="/notifications">
            <Notifications />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
