import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useSalonContext } from '../utils/GlobalState';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useSalonContext();
  const navigate = useNavigate();

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
      console.log("Form State: ", formState);
      const { data } = await addUser({
        variables: { ...formState },
      });
      localStorage.setItem("id_token", data.addUser.token);
      setUser(data.addUser.user);
      navigate("/home");
    } catch (err) {
      console.error("Signup error: ", err);
      // Check for specific error message from server
      const errorMessage =
        err.message === "Email already in use"
          ? "Email already in use"
          : "Signup failed";
      setErrorMessage(errorMessage); // Update state with error message
    }
  };

  return (
    <div>
      <h1 className='row justify-content-center'>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          className='col-6 m-2'
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          className='col-6 m-2'
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          className='col-6 m-2'
          type="email"
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
        <button className='col-6 m-2' type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className='col-6 m-2'>Signup failed</p>}
    </div>
  );
}