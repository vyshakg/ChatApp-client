import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import SignInPage from "./components/Pages/SignInPage";
import SignUpPage from "./components/Pages/SignUpPage";
import HomeMessagepage from "./components/Pages/HomeMessagepage";
const App = ({ location }) => {
  console.log();
  return (
    <Switch>
      <Route location={location} exact path="/" component={LandingPage} />
      <Route location={location} exact path="/signin" component={SignInPage} />
      <Route location={location} exact path="/signup" component={SignUpPage} />
      {!!localStorage.getItem("token") ? (
        <Route
          location={location}
          exact
          path="/home/:conversationId?"
          component={HomeMessagepage}
        />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
};

export default App;
