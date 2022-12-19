import { onError } from '@apollo/client/link/error';
import { cache, isLoggedInVar, toastMessage } from './cache';

export const errorLink = onError(({ response, graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      const serverMsg = graphQLErrors?.length && graphQLErrors[0]?.message;
      toastMessage({ type: 'error', message: serverMsg ? serverMsg : message });
      if (message === 'Unauthorized') {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        isLoggedInVar(false);
        cache.reset();
      }
      return forward(operation);
    });
  if (networkError) {
    // console.log(`[Network error]: ${networkError.message}`);
    //Store the error message to client
    toastMessage({ type: 'error', message: networkError.message });
    return forward(operation);
  }
  return forward(operation);
});