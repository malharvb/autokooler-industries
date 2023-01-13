/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const StockContext = createContext();

function stockReducer(state, action) {
  switch (action.type) {
    case 'SETSTOCK':
      return { stock: action.payload };
    case 'ADDSTOCK':
      return { stock: [action.payload, ...state.stock] };
    case 'DELETESTOCK':
      return { stock: state.stock.filter((p) => p._id !== action.payload._id) };
    default:
      return state;
  }
}

export function StockContextProvider({ children }) {
  const [state, dispatch] = useReducer(stockReducer, { stock: null });
  return (
    <StockContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
}

StockContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
