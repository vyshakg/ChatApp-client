import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
const host = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const httpLink = createHttpLink({
  uri: `${host}/graphql`,
  credentials: "same-origin"
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_WEB_SOCKET}/graphql`,
  options: {
    reconnect: true
  }
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get("token");

      if (token) {
        localStorage.setItem("token", token);
      }
    }
    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(authLink.concat(httpLink));

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithMiddleware
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
