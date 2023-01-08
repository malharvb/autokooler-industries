/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import { createContext, useReducer, React } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SETPRODUCT':
      return { products: action.payload };
    case 'ADDPRODUCT':
      return { products: [action.payload, ...state.products] };
    case 'DELETEPRODUCT':
      return { products: state.products.filter((p) => p._id !== action.payload._id) };
    default:
      return state;
  }
};

export function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, { products: null });

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
