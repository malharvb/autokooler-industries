import React, { useEffect } from 'react';
import ProductDetails from '../components/ProductDetails';
import useProductContext from '../hooks/useProductContext';

function Product() {
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
    <div className="product-container">
      {products
      && products.map((product) => (<ProductDetails product={product} />))}

    </div>
  );
}

export default Product;
