import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ?? 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);