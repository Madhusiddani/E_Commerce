import { useEffect, useState } from 'react';
import Message from '../components/Message.jsx';
import request from '../services/api.js';

const emptyProduct = {
  name: '',
  image: '',
  brand: '',
  category: '',
  description: '',
  price: 0,
  countInStock: 0
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProducts = async () => {
    const data = await request('/products');
    setProducts(data);
  };

  useEffect(() => {
    loadProducts().catch((err) => setError(err.message));
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), countInStock: Number(form.countInStock) };
      await request(editingId ? `/products/${editingId}` : '/products', {
        method: editingId ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      });
      setForm(emptyProduct);
      setEditingId('');
      setMessage('Product saved');
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      image: product.image,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock
    });
  };

  const deleteProduct = async (id) => {
    await request(`/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  return (
    <section className="split-layout wide">
      <form className="panel" onSubmit={submitHandler}>
        <h1>{editingId ? 'Edit Product' : 'Add Product'}</h1>
        {message && <Message>{message}</Message>}
        {error && <Message type="error">{error}</Message>}
        {Object.keys(emptyProduct).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
          </div>
        ))}
        <button type="submit">Save Product</button>
      </form>
      <div className="panel">
        <h1>Products</h1>
        {products.map((product) => (
          <div className="admin-row" key={product._id}>
            <span>{product.name}</span>
            <strong>${product.price.toFixed(2)}</strong>
            <button className="ghost" onClick={() => editProduct(product)} type="button">Edit</button>
            <button className="ghost danger" onClick={() => deleteProduct(product._id)} type="button">Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminProducts;
