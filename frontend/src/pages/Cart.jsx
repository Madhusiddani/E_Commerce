import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { useApp } from '../context/AppContext.jsx';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, userInfo } = useApp();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <Message>Your cart is empty. <Link to="/">Go shopping</Link></Message>;
  }

  return (
    <section className="split-layout">
      <div className="panel">
        <h1>Shopping Cart</h1>
        {cartItems.map((item) => (
          <div className="cart-row" key={item._id}>
            <img src={item.image} alt={item.name} />
            <Link to={`/product/${item._id}`}>{item.name}</Link>
            <select value={item.quantity} onChange={(event) => addToCart(item, Number(event.target.value))}>
              {[...Array(item.countInStock).keys()].slice(0, 10).map((value) => (
                <option key={value + 1} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            <button className="ghost" onClick={() => removeFromCart(item._id)} type="button">
              Remove
            </button>
          </div>
        ))}
      </div>
      <aside className="summary">
        <h2>Subtotal</h2>
        <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</p>
        <strong>${subtotal.toFixed(2)}</strong>
        <button onClick={() => navigate(userInfo ? '/checkout' : '/login?redirect=/checkout')} type="button">
          Proceed to Checkout
        </button>
      </aside>
    </section>
  );
};

export default Cart;
