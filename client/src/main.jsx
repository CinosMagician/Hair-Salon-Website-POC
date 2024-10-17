import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error'; // Ensure you import or define the Error component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />, // Define this component or import it
    children: [
      {
        path: 'home', // No need to use 'index: true' unless this is your default route
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);