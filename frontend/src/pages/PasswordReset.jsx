import React, { useState } from 'react';

import usePasswordReset from '../hooks/usePasswordReset';

function PasswordReset() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { error, isLoading, reset } = usePasswordReset();

  async function handleClick() {
    const success = await reset(username, password, newPassword);

    if (success) {
      setUsername('');
      setPassword('');
      setNewPassword('');
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">Password Reset</div>
      <form>
        <div className="input-container">
          <label htmlFor="username">User Name:</label>
          <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value); }} value={username} maxLength="15" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} value={password} maxLength="15" />
        </div>
        <div className="input-container">
          <label htmlFor="newpassword">New Password:</label>
          <input type="password" id="newpassword" name="newpassword" onChange={(e) => { setNewPassword(e.target.value); }} value={newPassword} maxLength="15" />
        </div>
        <button type="submit" className="submit-button" onClick={handleClick} disabled={isLoading}>Reset</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default PasswordReset;
