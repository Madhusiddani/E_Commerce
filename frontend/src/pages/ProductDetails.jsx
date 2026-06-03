import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useApp } from '../context/AppContext.jsx';
import request from '../services/api.js';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    request(`/products/${id}`)
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <Message type="error">{error}</Message>;
  if (!product) return <Loader />;

  const addHandler = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <section className="details">
      <img src={product.image} alt={product.name} />
      <div className="details-content">
        <Link to="/">Back to products</Link>
        <p className="category">{product.brand} / {product.category}</p>
        <h1>{product.name}</h1>
        <div className="rating">Star {product.rating} from {product.numReviews} reviews</div>
        <p>{product.description}</p>
        <strong className="price">${product.price.toFixed(2)}</strong>
        <div className="buy-box">
          <span>{product.countInStock > 0 ? `${product.countInStock} available` : 'Out of stock'}</span>
          <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
            {[...Array(product.countInStock).keys()].slice(0, 10).map((item) => (
              <option key={item + 1} value={item + 1}>
                {item + 1}
              </option>
            ))}
          </select>
          <button disabled={product.countInStock === 0} onClick={addHandler} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
