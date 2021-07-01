import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from "@apollo/client";
import {WebSocketLink} from "apollo-link-ws";
import { split } from 'apollo-link';
import { getMainDefinition } from '@apollo/client/utilities';

const url = new URL("/graphql", window.location.href);


const httpLink = new HttpLink({uri: url.href});
const wsLink = new WebSocketLink({
  // uri: `ws://localhost:8080/`,
  uri: url.href.replace("http", "ws"),
  options: { reconnect: true }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
