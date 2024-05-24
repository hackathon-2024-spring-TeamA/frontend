import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://api.tech-libra.com:443/graphql/",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
