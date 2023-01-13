import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useUserContext from '../hooks/useUserContext';
import useStockContext from '../hooks/useStockContext';

function PrivateStockForm({ type }) {
  const { user } = useUserContext();
  const { dispatch } = useStockContext();
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch('/api/stock', {
      method: 'POST',
      body: JSON.stringify({ name, type }),
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'ADDSTOCK', payload: json });

      setName('');
    }
  }

  return (
    <form className="stock-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <input type="submit" className="submit-button" value="Add Item" />
    </form>
  );
}

export default PrivateStockForm;

PrivateStockForm.propTypes = {
  type: PropTypes.string.isRequired,
};
