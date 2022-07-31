import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { FormView } from "./components/FormView";

const client = new ApolloClient({
  uri: "http://152.228.215.94:83/api",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FormView />
    </ApolloProvider>
  );
}

export default App;
