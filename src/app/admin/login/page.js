'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css'; // using CSS module

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy auth logic (replace with real logic if needed)
    // Accept any credentials for admin
    localStorage.setItem('admin_auth', 'true');
    localStorage.setItem('admin_user', email);
    router.push('/admin/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.adminTitle}>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.loginInput}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.loginInput}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}
