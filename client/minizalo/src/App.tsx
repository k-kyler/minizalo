import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Chat } from "./pages/Chat";
import { Friends } from "./pages/Friends";
import { Home } from "./pages/Home";
import { Notifications } from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/chat">
          <Chat />
        </Route>

        <Route exact path="/friends">
          <Friends />
        </Route>

        <Route exact path="/notifications">
          <Notifications />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
