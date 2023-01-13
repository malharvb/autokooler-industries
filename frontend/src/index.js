/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { ProductContextProvider } from './context/productContext';
import { StockContextProvider } from './context/stockContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ProductContextProvider>
      <StockContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StockContextProvider>
    </ProductContextProvider>
  </UserContextProvider>,
);
