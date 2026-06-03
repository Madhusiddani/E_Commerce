const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
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
