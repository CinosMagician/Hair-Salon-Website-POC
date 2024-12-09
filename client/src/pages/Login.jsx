import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import { useSalonContext } from '../utils/GlobalState';
import Loading from '../components/Loading'; // Import the Loading component

export default function Login() {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_USER); // Capture loading state here
  const { state, setUser } = useSalonContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/home');
    }
  }, [state.isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      localStorage.setItem('id_token', data.login.token);
      setUser(data.login.user);
      navigate('/home');
    } catch (e) {
      console.error(e);
    }
  };

  // Use Loading component when mutation is in progress
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='row justify-content-center'>
      <h1 className='col-6'>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          className='col-6 m-2'
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className='col-6 m-2'
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className='col-6 m-2' type="submit">
          Login
        </button>
      </form>
      {error && <p className='col-6 m-2'>Username or Password Incorrect</p>}
    </div>
  );
}
