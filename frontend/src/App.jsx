import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import useUserContext from './hooks/useUserContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Products';
import Stock from './pages/Stock';

function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={!user ? <Product /> : <Navigate to="/stock" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/stock" element={user ? <Stock /> : <Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

export default App;
