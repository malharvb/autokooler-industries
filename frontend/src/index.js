/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { ProductContextProvider } from './context/productContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ProductContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProductContextProvider>
  </UserContextProvider>,
);
