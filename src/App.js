import React from "react";
import { Route } from "react-router-dom";

import SignInPage from "./components/Pages/SignInPage";
import SignUpPage from "./components/Pages/SignUpPage";
import HomeMessagepage from './components/Pages/HomeMessagepage'
const App = ({ location }) => {
  return (
    <>
      <Route location={location} exact path="/signin" component={SignInPage} />
      <Route location={location} exact path="/signup" component={SignUpPage} />
      <Route
        location={location}
        exact
        path="/messages"
        component={HomeMessagepage}
      />
    </>
  );
};

export default App;
