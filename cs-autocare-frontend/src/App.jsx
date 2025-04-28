import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import { Checkout } from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import SalesAdmin from './pages/admin/salesAdmin';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/cart';
import Home from './pages/home';

function App() {
  return (
    <>
      <Router>
          <Nav/>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
              } />
              <Route path='/product/:productId' element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
              } />
              <Route path='/cart' element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>} />
              <Route path='/checkout' element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
              } />
              <Route path='/admin' element={
                  <ProtectedRoute>
                    <SalesAdmin />
                  </ProtectedRoute>
              } />
            </Routes>
          <Footer/> 
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
