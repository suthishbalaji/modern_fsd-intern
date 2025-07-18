'use client';
import React, { useState, useEffect } from 'react';
import './admin.css';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('add');
  const [editIndex, setEditIndex] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('admin_auth');
      if (!isAdmin) {
        router.push('/admin/login');
      }
      let storedItems = localStorage.getItem('items');
      if (!storedItems || JSON.parse(storedItems).length === 0) {
        const defaultItems = [
          {
            title: 'Egg Curry',
            price: 120,
            image: 'https://www.cookwithmanali.com/wp-content/uploads/2016/01/Punjabi-Egg-Curry.jpg'
          },
          {
            title: 'Biriyani',
            price: 180,
            image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg'
          },
          {
            title: 'Paneer Butter Masala',
            price: 160,
            image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/01/paneer-butter-masala-1-500x500.jpg'
          },
          {
            title: 'Veg Pulao',
            price: 110,
            image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/veg-pulao-recipe.jpg'
          },
          {
            title: 'Chicken Tikka',
            price: 200,
            image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/12/Chicken-Tikka-Recipe.jpg'
          },
          {
            title: 'Masala Dosa',
            price: 90,
            image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/masala-dosa-recipe.jpg'
          },
          {
            title: 'Chole Bhature',
            price: 140,
            image: 'https://www.cookwithmanali.com/wp-content/uploads/2018/04/Chole-Bhature.jpg'
          },
          {
            title: 'Fish Fry',
            price: 220,
            image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/fish-fry-recipe.jpg'
          },
          {
            title: 'Veg Manchurian',
            price: 130,
            image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/12/veg-manchurian-recipe-1-500x500.jpg'
          },
          {
            title: 'Gulab Jamun',
            price: 80,
            image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/08/gulab-jamun-recipe-1-500x500.jpg'
          }
        ];
        localStorage.setItem('items', JSON.stringify(defaultItems));
        setItems(defaultItems);
      } else {
        setItems(JSON.parse(storedItems));
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!title || !price || !imageUrl) {
      alert('Please fill in all fields.');
      return;
    }

    const newItem = { title, price, image: imageUrl };
    let updatedItems;

    if (editIndex !== null) {
      updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setEditIndex(null);
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setTitle('');
    setPrice('');
    setImageUrl('');
    alert(editIndex !== null ? 'Item updated!' : 'Item added!');
  };

  const handleEdit = (index) => {
    const item = items[index];
    setTitle(item.title);
    setPrice(item.price);
    setImageUrl(item.image);
    setActiveTab('add');
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_user');
    router.push('/login');
  };

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <button className="logout-btn" style={{marginBottom: '24px'}} onClick={handleAdminLogout}>Logout</button>
        <div
          className={`sidebar-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('add');
            setEditIndex(null);
            setTitle('');
            setPrice('');
            setImageUrl('');
          }}
        >
          ➕ {editIndex !== null ? 'Update Item' : 'Add Items'}
        </div>
        <div
          className={`sidebar-button ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          ✅ List Items
        </div>
      </aside>

      <main className="content">
        {activeTab === 'add' && (
          <div className="form-section fade-in">
            <h2>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h2>
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter item title"
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter item price"
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview animated" />
            )}
            <button className="add-button" onClick={handleSubmit}>
              {editIndex !== null ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="item-list fade-in">
            <h2>Item List</h2>
            {items.length === 0 ? (
              <p>No items added yet.</p>
            ) : (
              <div className="cards">
                {items.map((item, idx) => (
                  <div key={idx} className="item-card hover-pop">
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                    <p>₹ {item.price}</p>
                    <div className="admin-actions">
                      <button onClick={() => handleEdit(idx)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(idx)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
