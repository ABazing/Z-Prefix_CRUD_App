import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Username or Password incorrect.');
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/inventory');
    } catch (err) {
      alert('Username or Password incorrect.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p><a href="/register">Register an Account</a></p>
      <p><a href="/public-items">View All Inventories</a></p>
    </div>
  );
}

export default Login;