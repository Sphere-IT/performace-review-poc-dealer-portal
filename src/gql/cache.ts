import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(
  !!localStorage.getItem('token') && localStorage.getItem('isRestPassword') !== 'true'
);
// localStorage.getItem('isRestPassword') !== 'true' => Using this check, we can distinguish between logins and password resets token
export const preLoginTitle = makeVar('Login');

export const accessToken = makeVar(localStorage.getItem('token'));

export const toastMessage = makeVar({ type: 'error', message: '' });

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        loginTitle: {
          read() {
            return preLoginTitle();
          },
        },
        getAccessToken: {
          read() {
            return accessToken();
          },
        },
        toastMessage: {
          read() {
            return toastMessage();
          },
        },
      },
    },
  },
});