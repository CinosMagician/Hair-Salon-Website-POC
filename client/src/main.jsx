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
import Cart from './pages/Cart';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3099/graphql',
  // import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ?? 
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
      {
        path: 'cart',
        element: <Cart />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);