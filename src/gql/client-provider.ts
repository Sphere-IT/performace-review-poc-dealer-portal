import { ApolloClient, from, HttpLink } from '@apollo/client';
import { cache } from 'gql/cache';
import { authLink } from 'gql/auth-link';
import { errorLink } from './error-link';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

export const clientProvider = new ApolloClient({
  cache: cache,
  link: from([authLink, errorLink, httpLink]),
  headers: {
    Authorization: '',
  },
  defaultOptions: defaultOptions as any, //use Default options by Apollo Client
});