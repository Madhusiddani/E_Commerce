import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import ProductCard from '../components/ProductCard.jsx';
import request from '../services/api.js';

const categories = ['All', 'Electronics', 'Audio', 'Home', 'Furniture', 'Fashion'];

const Home = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const category = params.get('category') || 'All';
  const sort = params.get('sort') || 'newest';
  const keyword = params.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (keyword) query.set('keyword', keyword);
        if (category !== 'All') query.set('category', category);
        if (sort !== 'newest') query.set('sort', sort);
        const data = await request(`/products?${query.toString()}`);
        setProducts(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, keyword, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === 'All' || value === 'newest') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  return (
    <>
      <section className="hero">
        <div>
          <p>Fast deals, clean checkout, full-stack code</p>
          <h1>ShopZone</h1>
        </div>
      </section>
      <section className="toolbar">
        <div className="tabs">
          {categories.map((item) => (
            <button className={category === item ? 'active' : ''} key={item} onClick={() => updateParam('category', item)} type="button">
              {item}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(event) => updateParam('sort', event.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </section>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </>
  );
};

export default Home;
