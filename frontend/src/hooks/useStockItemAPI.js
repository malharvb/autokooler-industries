import { useState } from 'react';

const useStockItemAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addStockItemChild = async (name, id, token, rate) => {
    setIsLoading(true);
    const response = await fetch('/api/stock/item', {
      method: 'PATCH',
      body: JSON.stringify({ name, id, rate }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    setIsLoading(false);

    if (response.ok) {
      setError('');
      return json;
    }
    setError(json.error);
    return false;
  };

  const deleteStockItemChild = async (itemId, id, token) => {
    setIsLoading(true);
    const response = await fetch(`/api/stock/item/${itemId}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    setIsLoading(false);

    if (response.ok) {
      setError('');
      return json;
    }
    setError(json.error);
    return false;
  };

  const updateCount = async (itemId, id, count, token) => {
    setIsLoading(true);
    const response = await fetch('/api/stock/item/count', {
      method: 'PATCH',
      body: JSON.stringify({ itemId, id, count }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    setIsLoading(false);
    if (response.ok) {
      setError('');
      return json;
    }
    setError(json.error);

    return false;
  };

  const resetDate = async (itemId, id, token) => {
    setIsLoading(true);
    const response = await fetch('/api/stock/item/resetDate', {
      method: 'PATCH',
      body: JSON.stringify({ itemId, id }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    setIsLoading(false);
    if (response.ok) {
      setError('');
      return json;
    }
    setError(json.error);

    return false;
  };

  return {
    addStockItemChild, deleteStockItemChild, updateCount, resetDate, isLoading, error,
  };
};

export default useStockItemAPI;
