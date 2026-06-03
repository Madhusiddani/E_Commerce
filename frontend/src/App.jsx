import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Register from './pages/Register.jsx';

const App = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
