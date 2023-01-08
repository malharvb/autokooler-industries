/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useReducer, React, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';

export const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
