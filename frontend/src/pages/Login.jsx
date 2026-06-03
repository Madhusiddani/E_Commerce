import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { useApp } from '../context/AppContext.jsx';
import request from '../services/api.js';

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/users/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      login(data);
      navigate(params.get('redirect') || '/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth">
      <form className="panel" onSubmit={submitHandler}>
        <h1>Login</h1>
        {error && <Message type="error">{error}</Message>}
        <label>Email</label>
        <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <button type="submit">Sign In</button>
        <p>New customer? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
};

export default Login;
