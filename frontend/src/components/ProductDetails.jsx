/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import useUserContext from '../hooks/useUserContext';
import useProductContext from '../hooks/useProductContext';

function ProductDetails({ product }) {
  const { name, img } = product;

  const { user } = useUserContext();
  const { dispatch } = useProductContext();

  const handleClick = async () => {
    const response = await fetch(`/api/product/${product._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETEPRODUCT', payload: json });
    }
  };

  const base64String = btoa(String.fromCharCode(...new Uint8Array(img.data.data)));

  return (
    <div className="product-details">
      <img src={`data:image/${img.contentType};base64,${base64String}`} alt="product" className="product-img" />

      <div>
        {' '}
        {name}
        {' '}
      </div>
      {user && <button type="button" onClick={handleClick}>Delete</button>}
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default ProductDetails;
