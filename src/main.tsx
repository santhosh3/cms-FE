import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  Observable
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import './index.css'
import App from './App.tsx'
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, refreshAccessToken } from './authStore';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext(async (_, { headers }) => {
  let token = getAccessToken();
  if (!token) {
    token = await refreshAccessToken();
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const errorLink = new ApolloLink((operation, forward) => {
  if (!forward) {
    return new Observable((observer) => {
      observer.complete();
    });
  }

  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (result) => {
        const graphQLErrors = (result as any)?.errors;
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            if (err.extensions?.code === 'UNAUTHENTICATED') {
              import('./authStore').then(({ setAccessToken }) => setAccessToken(null));
            }
          }
        }
        observer.next(result);
      },
      error: (networkError) => {
        console.error(`[Network error]: ${networkError}`);
        observer.error(networkError);
      },
      complete: () => observer.complete(),
    });

    return () => subscription.unsubscribe();
  });
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
