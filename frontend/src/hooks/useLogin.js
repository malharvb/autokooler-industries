import { useState } from 'react';
import useUserContext from './useUserContext';

const useLogin = () => {
  const { dispatch } = useUserContext();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();

  const login = async (username, password) => {
    setLoading(true);

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },

    });
    const json = await response.json();
    setLoading(false);
    if (response.ok) {
      dispatch({ type: 'LOGIN', payload: json });
      localStorage.setItem('user', JSON.stringify(json));
      return true;
    }
    setError(json.error);
    return false;
  };

  return { error, isLoading, login };
};

export default useLogin;
