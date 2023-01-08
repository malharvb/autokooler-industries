/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';

import useProductContext from '../hooks/useProductContext';

import ProductDetails from '../components/ProductDetails';
import StockForm from '../components/StockForm';

function Stock() {
  const { products, dispatch } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SETPRODUCT', payload: json });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="stock-page">
      <div className="stock-container">
        {products
        && products.map((product) => (<ProductDetails product={product} key={product._id} />))}
      </div>
      <StockForm />
    </div>
  );
}

export default Stock;
