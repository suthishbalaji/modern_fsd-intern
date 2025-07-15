'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'; // Make sure this file exists in the same folder

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!username || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    // Save to localStorage
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', username); // 👈 Store username

    router.push('/'); // Redirect to homepage
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
