import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/login_page";
import ChatBotPage from "./pages/chatbot_page";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/chatbot" component={ChatBotPage} />
    </Switch>
  );
}

export default App;
