import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

function Navbar() {
  const { user, dispatch } = useUserContext();

  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return (
    <div className="nav-bar">
      <Link to="/"><header className="nav-header">Autokooler Industries</header></Link>
      <div className="nav-links">
        <Link to="/products">Our Products</Link>
        {!user && (<Link to="/login">Login</Link>)}
        {user && (<button type="button" onClick={handleClick}>Logout</button>)}
      </div>
    </div>
  );
}

export default Navbar;
