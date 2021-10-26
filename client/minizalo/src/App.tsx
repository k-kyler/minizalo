import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Chat } from "./pages/Chat";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/chat">
          <Chat />
        </Route>

        <Route exact path="/"></Route>
      </Switch>
    </Router>
  );
}

export default App;
