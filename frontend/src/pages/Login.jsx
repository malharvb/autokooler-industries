import React, { useState } from 'react';

import useLogin from '../hooks/useLogin';

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { error, isLoading, login } = useLogin();

  async function handleClick() {
    const success = await login(username, password);

    if (success) {
      setUsername('');
      setPassword('');
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">Login</div>
      <form>
        <div className="input-container">
          <label htmlFor="username">User Name:</label>
          <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value); }} value={username} maxLength="15" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} value={password} maxLength="15" />
        </div>
        <button type="submit" className="submit-button" onClick={handleClick} disabled={isLoading}>Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
