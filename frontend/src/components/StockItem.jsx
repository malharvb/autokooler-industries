import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useUserContext from '../hooks/useUserContext';
import useStockItemAPI from '../hooks/useStockItemAPI';

function StockItem({ stockItem, refreshStockItem }) {
  const { user } = useUserContext();
  const {
    addStockItemChild, deleteStockItemChild, updateCount, resetDate, isLoading, error,
  } = useStockItemAPI();

  const [name, setName] = useState('');
  const [rate, setRate] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const successJson = await addStockItemChild(name, stockItem._id, user.token, rate);

    if (successJson) {
      setName('');
      setRate('');
      refreshStockItem(successJson);
    }
  }

  async function handelDeleteClick(itemId) {
    if (!window.confirm('Do you want to delete this item?')) { return; }
    const successJson = await deleteStockItemChild(itemId, stockItem._id, user.token);

    if (successJson) {
      refreshStockItem(successJson);
    }
  }

  async function handleCountClick(count, itemId) {
    const successJson = await updateCount(itemId, stockItem._id, count, user.token);

    if (successJson) {
      refreshStockItem(successJson);
    }
  }

  async function handelResetClick(itemId) {
    if (!window.confirm('Do you want to reset the date for this item?')) { return; }
    const successJson = await resetDate(itemId, stockItem._id, user.token);

    if (successJson) {
      refreshStockItem(successJson);
    }
  }

  return (
    <>
      <div className="stockitem-details">
        <div>{stockItem.name}</div>
        <div>{stockItem.type}</div>
        {stockItem.items && stockItem.items.map((item) => (
          <div key={item._id} className="stockitem-container">
            <span>{item.itemName}</span>
            <span className="item-count-container">
              <button type="button" onClick={() => { if (parseInt(item.itemCount, 10) === 0) return; handleCountClick((parseInt(item.itemCount, 10) - 1), item._id); }} disabled={isLoading}>-</button>
              <span>{item.itemCount}</span>
              <button type="button" onClick={() => { handleCountClick((parseInt(item.itemCount, 10) + 1), item._id); }} disabled={isLoading}>+</button>
            </span>
            {item.rate && (
            <span>
              &#8377;
              {item.rate}
            </span>
            )}
            {item.lastSold && (
            <span>
              Last sold:
              {' '}
              {new Date(item.lastSold).toLocaleString()}
            </span>
            )}
            <button type="button" onClick={() => { handelDeleteClick(item._id); }} disabled={isLoading}>Delete</button>
            <button type="button" onClick={() => { handelResetClick(item._id); }} disabled={isLoading}>Reset Date</button>
          </div>
        ))}
      </div>

      <form className="stock-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength="15" />
        </div>
        <div className="input-container">
          <label>Rate:</label>
          <input type="text" value={rate} onChange={(e) => setRate(e.target.value)} maxLength="15" pattern="\d*" />
        </div>
        <input type="submit" className="submit-button" value="Add Item" />
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}

StockItem.propTypes = {
  stockItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      itemCount: PropTypes.number.isRequired,
    })),
  }).isRequired,
  refreshStockItem: PropTypes.func.isRequired,
};

export default StockItem;
