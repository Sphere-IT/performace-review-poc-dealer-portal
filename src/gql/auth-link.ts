import { ApolloLink } from '@apollo/client';

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: Record<string, any>) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '', // however you get your token
        ...headers,
      },
    };
  });
  return forward(operation);
});