import { useState } from 'react';
import useProductContext from './useProductContext';
import useUserContext from './useUserContext';

const useAddProduct = () => {
  const { user } = useUserContext();
  const { dispatch } = useProductContext();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const addProduct = async (name, img) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', img);

    const response = await fetch('/api/product', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    setLoading(false);
    if (response.ok) {
      dispatch({ type: 'ADDPRODUCT', payload: json });

      return true;
    }
    setError(json.error);
    return false;
  };

  return { error, isLoading, addProduct };
};

export default useAddProduct;
