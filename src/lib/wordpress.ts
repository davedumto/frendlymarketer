import { GraphQLClient } from 'graphql-request';

const WORDPRESS_API_URL = 'https://frendlymarqeter.com/graphql';

export const graphQLClient = new GraphQLClient(WORDPRESS_API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: (url, options) => {
    // Add 10 second timeout to prevent indefinite waiting
    return fetch(url, {
      ...options,
      signal: AbortSignal.timeout(10000),
    });
  },
});

export default graphQLClient;
