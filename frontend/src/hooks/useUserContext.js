import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error('User context invoked outside of tree');
  }

  return context;
};

export default useUserContext;
