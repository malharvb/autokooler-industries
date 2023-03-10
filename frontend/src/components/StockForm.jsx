import React, { useState } from 'react';
import useAddProduct from '../hooks/useAddProduct';

function StockForm() {
  const { error, isLoading, addProduct } = useAddProduct();

  const [name, setName] = useState('');
  const [img, setImg] = useState(null);
  const [imgPath, setImgPath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = addProduct(name, img);

    if (success) {
      setName('');
      setImg(null);
      setImgPath('');
    }
  };

  return (
    <form className="stock-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength="15" />
      </div>
      <div className="input-container">
        <label>Product Image:</label>
        <input
          type="file"
          value={imgPath}
          onChange={(e) => {
            setImg(e.target.files[0]);
            setImgPath(e.target.value);
          }}
          required
        />
      </div>
      <input type="submit" className="submit-button" disabled={isLoading} value="Add Product" />
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default StockForm;
