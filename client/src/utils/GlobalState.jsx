import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import Auth from "./auth";

// Create the context
const SalonContext = createContext();

// Initial state
const initialState = {
  user: Auth.getProfile() || null,
  isAuthenticated: Auth.loggedIn(),
  events: [],
  currentEvent: null,
  songRequests: [],
  isModalOpen: false,
  error: null,
  loading: false,
};

// Provider component
const SalonProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Function to update state
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Specific update functions
  const setUser = (user) => updateState({ user, isAuthenticated: !!user });
  const setEvents = (events) => updateState({ events });
  const setCurrentEvent = (currentEvent) => updateState({ currentEvent });
  const setSongRequests = (songRequests) => updateState({ songRequests });
  const setIsModalOpen = (isModalOpen) => updateState({ isModalOpen });
  const setError = (error) => updateState({ error });
  const setLoading = (loading) => updateState({ loading });

  // Value to be provided to consumers
  const value = {
    state,
    setUser,
    setEvents,
    setCurrentEvent,
    setSongRequests,
    setIsModalOpen,
    setError,
    setLoading,
  };

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
};

// PropTypes for the provider
SalonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the context
const useSalonContext = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error("useSalonContext must be used within a SalonProvider");
  }
  return context;
};

export { SalonProvider, useSalonContext };

// Comments:
// - We've replaced the useReducer with useState for simpler state management.
// - Instead of dispatching actions, we now have specific functions to update each part of the state.
// - The context now provides both the state and these update functions.
// - Consumers can use the useSalonContext hook to access both state and update functions.
// - This approach is more straightforward for simpler applications while still providing global state management.
