import { Fragment, useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import request from '../services/api.js';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    request('/orders/myorders')
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Message type="error">{error}</Message>;

  return (
    <section className="panel">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <Message>No orders yet.</Message>
      ) : (
        <div className="table">
          <div className="table-head">Order</div>
          <div className="table-head">Date</div>
          <div className="table-head">Total</div>
          <div className="table-head">Status</div>
          {orders.map((order) => (
            <Fragment key={order._id}>
              <div>{order._id.slice(-8)}</div>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              <div>${order.totalPrice.toFixed(2)}</div>
              <div>{order.isDelivered ? 'Delivered' : 'Processing'}</div>
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
