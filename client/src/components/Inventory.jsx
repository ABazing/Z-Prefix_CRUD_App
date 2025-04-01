import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Inventory({ user }) {
  const [myItems, setMyItems] = useState([]); // User's own items
  const [allItems, setAllItems] = useState([]); // All items (public)
  const [newItem, setNewItem] = useState({ item_name: '', description: '', quantity: '' });
  const navigate = useNavigate();

  // Fetch user's items
  useEffect(() => {
    const fetchMyItems = async () => {
      const res = await axios.get('http://localhost:3000/my-items', {
        headers: { 'x-user-id': user.id }
      });
      setMyItems(res.data);
    };

    // Fetch all items
    const fetchAllItems = async () => {
      const res = await axios.get('http://localhost:3000/items');
      setAllItems(res.data);
    };

    fetchMyItems();
    fetchAllItems();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/items', newItem, {
      headers: { 'x-user-id': user.id }
    });
    setNewItem({ item_name: '', description: '', quantity: '' });
    // Refresh both lists after creating a new item
    const myItemsRes = await axios.get('http://localhost:3000/my-items', {
      headers: { 'x-user-id': user.id }
    });
    const allItemsRes = await axios.get('http://localhost:3000/items');
    setMyItems(myItemsRes.data);
    setAllItems(allItemsRes.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Inventory</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Item Name" value={newItem.item_name} onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })} required />
        <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
        <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} required />
        <button type="submit">Add Item</button>
      </form>

      <h2>Items I've Created</h2>
      {myItems.length === 0 ? (
        <p>You haven't added any items yet.</p>
      ) : (
        <ul>
          {myItems.map(item => (
            <li key={item.id}>
              <span>{item.item_name} - {item.description} (Qty: {item.quantity})</span>
              <button onClick={() => navigate(`/items/${item.id}`)}>View/Edit</button>
            </li>
          ))}
        </ul>
      )}

      <h2>All Items</h2>
      {allItems.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {allItems.map(item => (
            <li key={item.id}>
              <span>{item.item_name} - {item.description} (Qty: {item.quantity})</span>
              <button onClick={() => navigate(`/items/${item.id}`)}>View</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inventory;