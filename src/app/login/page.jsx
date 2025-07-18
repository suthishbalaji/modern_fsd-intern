'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'; 

export default function LoginPage() {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (!email || !password) {
        alert('Please fill all fields.');
        return;
      }
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_user', email);
      router.push('/admin/dashboard');
    } else {
      if (!username || !email || !password) {
        alert('Please fill all fields.');
        return;
      }
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', username); 
      router.push('/');
    }
  };

  return (
    <div className={`login-container${role === 'user' ? ' user-bg-white' : ''}`}>
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="role-selector">
          <label className="role-label">
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            <span className="custom-dot"></span>
            User
          </label>
          <label className="role-label">
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            <span className="custom-dot"></span>
            Admin
          </label>
        </div>
        {role === 'user' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
