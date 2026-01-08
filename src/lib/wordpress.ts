import { GraphQLClient } from 'graphql-request';

const WORDPRESS_API_URL = 'https://frendlymarqeter.com/graphql';

export const graphQLClient = new GraphQLClient(WORDPRESS_API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export default graphQLClient;
