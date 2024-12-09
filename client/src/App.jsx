import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SalonProvider } from './utils/GlobalState';
import "./App.css";
import Header from './header';
import Footer from './footer';
import Auth from './utils/auth';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3099/graphql',
  // import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ??
});

// Create a middleware to attach the JWT token to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isAuthenticated = Auth.loggedIn(); // Use AuthService to check if user is logged in
  return (
    <ApolloProvider client={client}>
      <SalonProvider>
          <Header />
          <Outlet />
          <Footer />
      </SalonProvider>
    </ApolloProvider>
  );
}

export default App;