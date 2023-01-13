import { useContext } from 'react';
import { StockContext } from '../context/stockContext';

const useStockContext = () => {
  const context = useContext(StockContext);

  if (!context) {
    throw Error('Stock context used outside of tree');
  }

  return context;
};

export default useStockContext;
