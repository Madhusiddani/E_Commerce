import seedProducts from '../../../backend/src/data/products.js';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000/api');

const staticProducts = seedProducts.map((product, index) => ({
  ...product,
  _id: `static-${index + 1}`,
  reviews: []
}));

const getStaticProducts = (path) => {
  const url = new URL(path, 'http://static.local');
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0] !== 'products') {
    throw new Error('This action needs a hosted backend API.');
  }

  if (parts[1]) {
    const product = staticProducts.find((item) => item._id === parts[1]);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  const keyword = url.searchParams.get('keyword')?.toLowerCase();
  const category = url.searchParams.get('category');
  const sort = url.searchParams.get('sort');

  let products = [...staticProducts];

  if (keyword) {
    products = products.filter((product) => product.name.toLowerCase().includes(keyword));
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
};

const request = async (path, options = {}) => {
  if (!API_URL) {
    return getStaticProducts(path);
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (userInfo?.token) {
    headers.Authorization = `Bearer ${userInfo.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export default request;
