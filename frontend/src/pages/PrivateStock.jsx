/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrivateStockForm from '../components/PrivateStockForm';
import useStockContext from '../hooks/useStockContext';
import useUserContext from '../hooks/useUserContext';

function PrivateStock() {
  const { user } = useUserContext();
  const { stock, dispatch } = useStockContext();

  const [type, setType] = useState('copper');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/stock', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        const filteredStock = json.filter((item) => item.type === type);
        dispatch({ type: 'SETSTOCK', payload: filteredStock });
      }
    };

    fetchProducts();
  }, [type]);

  async function handelClick(id) {
    if (!window.confirm('Do you want to delete this item')) { return; }

    const response = await fetch(`/api/stock/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETESTOCK', payload: json });
    }
  }

  return (
    <>
      <div className="stock-navbar">
        <div role="button" onClick={() => { setType('copper'); }} onKeyDown="" tabIndex="0" className={type === 'copper' ? 'selected' : ''}>Copper</div>
        <div role="button" onClick={() => { setType('aluminium'); }} onKeyDown="" tabIndex="0" className={type === 'aluminium' ? 'selected' : ''}>Aluminium</div>
        <div role="button" onClick={() => { setType('other'); }} onKeyDown="" tabIndex="0" className={type === 'other' ? 'selected' : ''}>Other</div>
      </div>
      <div className="product-container">
        {stock && stock.map((item) => (
          <div className="product-details" key={item._id}>
            <Link to={`/privateStock/${item._id}`} className="item-container">
              {item.items.length === 0 && <div>{item.name}</div>}
              {item.items && item.items.map((i) => (
                <div key={i._id} className="item-details">
                  <span>
                    {item.name}
                    {' '}
                    {i.itemName}
                    :
                    {' '}
                  </span>
                  <span>
                    {i.itemCount}
                    {' '}
                    units
                    {' '}
                  </span>
                  {i.rate && (
                  <span>
                    &#8377;
                    {i.rate}
                  </span>
                  )}
                  {i.lastSold && (
                  <span>
                    Last sold:
                    {' '}
                    {new Date(i.lastSold).toLocaleString()}
                  </span>
                  )}
                </div>
              ))}

            </Link>
            <button type="button" onClick={() => handelClick(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <PrivateStockForm type={type} />
    </>
  );
}

export default PrivateStock;
