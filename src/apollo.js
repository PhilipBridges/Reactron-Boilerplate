import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { setContext } from "apollo-link-context";
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';


const cache = new InMemoryCache()

const request = async (operation) => {
  const { cache } = operation.getContext()
  const response = await cache.readQuery({
    query: gql`
      query {
        token 
      }
    `,
  })
  const token = response.token
  operation.setContext({
    headers: {
      Authorization: token && `Bearer ${token}`
    }
  })
}

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  credentials: 'include'
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  requestLink,
);

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors)
      }
      if (networkError) {
        console.log(networkError)
      }
    }),
    link,
    withClientState({
      defaults: {
        logged: false,
        token: '',
        info: {
          __typename: 'Profile',
          id: '',
          username: '',
        }
      },
      cache
    }),
    new HttpLink({
      uri: 'http://localhost:4000',
      credentials: 'include'
    }),
  ]),
  queryDeduplication: true,
  cache
});