import { useState } from 'react';
import useUserContext from './useUserContext';

const usePasswordReset = () => {
  const { dispatch } = useUserContext();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();

  const reset = async (username, password, newPassword) => {
    setLoading(true);

    const response = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ username, password, newPassword }),
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

  return { error, isLoading, reset };
};

export default usePasswordReset;
