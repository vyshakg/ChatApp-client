import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
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

const client = new ApolloClient({
  link: afterwareLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
});

export default client;
