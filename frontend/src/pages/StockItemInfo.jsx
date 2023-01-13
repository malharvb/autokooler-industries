/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StockItem from '../components/StockItem';
import useUserContext from '../hooks/useUserContext';

function StockItemInfo() {
  const { user } = useUserContext();
  const [stockItem, setStockItem] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function initStockItem() {
      const response = await fetch(`/api/stock/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      setStockItem(json);
    }

    initStockItem();
  }, []);

  const refreshStockItem = (newStockItem) => {
    setStockItem(newStockItem);
  };

  return (
    stockItem && (
      <StockItem stockItem={stockItem} refreshStockItem={refreshStockItem} />
    )
  );
}

export default StockItemInfo;
