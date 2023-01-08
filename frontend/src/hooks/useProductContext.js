import { useContext } from 'react';
import { ProductContext } from '../context/productContext';

const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw Error('Product context invoked outside of tree');
  }

  return context;
};

export default useProductContext;
