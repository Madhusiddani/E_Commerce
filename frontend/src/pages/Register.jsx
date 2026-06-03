import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { useApp } from '../context/AppContext.jsx';
import request from '../services/api.js';

const Register = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/users/register', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth">
      <form className="panel" onSubmit={submitHandler}>
        <h1>Create Account</h1>
        {error && <Message type="error">{error}</Message>}
        <label>Name</label>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <label>Email</label>
        <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <button type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
};

export default Register;
