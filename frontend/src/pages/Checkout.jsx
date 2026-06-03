import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { useApp } from '../context/AppContext.jsx';
import request from '../services/api.js';

const Checkout = () => {
  const { cartItems, clearCart } = useApp();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [error, setError] = useState('');
  const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await request('/orders', {
        method: 'POST',
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id
          })),
          shippingAddress: address,
          paymentMethod: 'Cash on Delivery',
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice
        })
      });
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="split-layout">
      <form className="panel" onSubmit={submitHandler}>
        <h1>Checkout</h1>
        {error && <Message type="error">{error}</Message>}
        {Object.keys(address).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input required value={address[field]} onChange={(event) => setAddress({ ...address, [field]: event.target.value })} />
          </div>
        ))}
        <button disabled={cartItems.length === 0} type="submit">Place Order</button>
      </form>
      <aside className="summary">
        <h2>Order Summary</h2>
        <p>Items: ${itemsPrice.toFixed(2)}</p>
        <p>Shipping: ${shippingPrice.toFixed(2)}</p>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </aside>
    </section>
  );
};

export default Checkout;
