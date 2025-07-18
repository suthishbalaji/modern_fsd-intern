'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const router = useRouter();

  const loadItems = () => {
    const stored = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(stored);
  };
  useEffect(() => {
    loadItems();
    const user = localStorage.getItem('user');
    if (user) setName(user);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadItems();
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.title === item.title);
      if (existing) {
        return prevCart.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((i) =>
          i.title === item.title
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="foodozer-home">
      {/* Modern Header */}
      <header className="foodozer-header">
        <div className="foodozer-logo">🍔 Foodozer</div>
        <nav className="foodozer-nav">
          <span className="foodozer-welcome">Hello, {name || 'Guest'}!</span>
          <a className="foodozer-link" href="#menu">Menu</a>
          <a className="foodozer-link" href="#" onClick={e => { e.preventDefault(); setShowCartModal(true); }}>
            Cart
            {cartCount > 0 && <span className="foodozer-cart-badge">{cartCount}</span>}
          </a>
          <button className="foodozer-logout" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="foodozer-hero">
        <div className="foodozer-hero-content">
          <h1 className="foodozer-hero-title">
            Fresh. Fast. <span className="accent">Foodozer</span>.
          </h1>
          <p className="foodozer-hero-desc">
            Discover a world of flavors and order your favorite food with just a few clicks. Fast delivery, fresh ingredients, and a menu that suits every craving.
          </p>
          <button className="foodozer-cta" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Browse Menu</button>
        </div>
        <div className="foodozer-hero-image">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" alt="Delicious food" />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="foodozer-menu-section">
        <h2 className="foodozer-menu-title" style={{ color: '#fff' }}>Our Menu</h2>
        <p className="foodozer-menu-desc" style={{ color: '#fff' }}>Handpicked dishes to delight your taste buds. Click + to add to your cart!</p>
        <div className="foodozer-menu-grid">
          {items.length === 0 ? (
            <div className="foodozer-empty">No items found.</div>
          ) : (
            items.map((item, idx) => (
              <div className="foodozer-card" key={idx}>
                <div className="foodozer-card-img-wrap">
                  <img src={item.image} alt={item.title} className="foodozer-card-img" />
                </div>
                <div className="foodozer-card-content">
                  <h3 className="foodozer-card-title">{item.title}</h3>
                  <p className="foodozer-card-price">₹{item.price}</p>
                  <button className="foodozer-card-add" onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="foodozer-cart-modal">
          <div className="foodozer-cart-modal-content">
            <h2 className="foodozer-cart-modal-title">Your Cart</h2>
            <button className="foodozer-cart-modal-close" onClick={() => setShowCartModal(false)}>×</button>
            <ul className="foodozer-cart-modal-list">
              {cart.map((item, idx) => (
                <li key={idx} className="foodozer-cart-modal-item">
                  <span className="foodozer-cart-modal-item-title">{item.title}</span>
                  <span className="foodozer-cart-modal-item-price">₹{item.price}</span>
                  <span className="foodozer-cart-modal-item-quantity">x{item.quantity}</span>
                  <button className="foodozer-cart-modal-item-plus" style={{marginLeft: 8, marginRight: 4, background: '#e0e0e0', border: 'none', borderRadius: '50%', width: 24, height: 24, fontWeight: 700, cursor: 'pointer'}} onClick={() => handleAddToCart(item)}>+</button>
                  <button className="foodozer-cart-modal-item-remove" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="foodozer-cart-modal-total" style={{margin: '16px 0', fontWeight: 700, fontSize: '1.1em'}}>Total: ₹{totalPrice}</div>
            <button className="foodozer-cart-modal-checkout" style={{marginBottom: 12, background: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 4, fontWeight: 700, cursor: 'pointer'}} onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
            <button className="foodozer-cart-modal-clear" onClick={handleClearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
