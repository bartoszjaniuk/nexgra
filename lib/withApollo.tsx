import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { API_URL, SSR_MODE } from 'constants/constants';
import nextWithApollo from 'next-with-apollo';

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: SSR_MODE,
      link: new HttpLink({
        uri: API_URL,
      }),
      headers: {
        ...(headers as Record<string, string>),
      },
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;
