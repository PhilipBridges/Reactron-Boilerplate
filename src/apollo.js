import ApolloClient, {
  HttpLink,
  InMemoryCache,
  getMainDefinition,
  split
} from "apollo-boost";

import { setContext } from "apollo-link-context";
import { WebSocketLink } from 'apollo-link-ws';

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

// const middlewareLink = setContext(() => ({
//   headers: {
//     "Authorization": localStorage.getItem("token"),
//   }
// }));

// const afterwareLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       Authorization: token && `Bearer ${token}`
//     }
//   }
// });

// const httpLinkWithMiddleware = afterwareLink.concat(
//   middlewareLink.concat(httpLink)
// );

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4000',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       token: localStorage.getItem('token'),
//     }
//   }
// });

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === "OperationDefinition" && operation === "subscription";
//   },
//   wsLink,
//   httpLinkWithMiddleware
// );

const cache = new InMemoryCache()

export default new ApolloClient({
  uri: 'http://localhost:4000/',
  fetchOptions: {
    credentials: 'include'
  },
  clientState: {
    defaults: {
      logged: false,
      info: {
        __typename: 'Profile',
        id: '',
        username: '',
      }
    }
  },
  request: async (operation) => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token && `Bearer ${token}`
      }
    });
  }
})