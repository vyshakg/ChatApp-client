import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
