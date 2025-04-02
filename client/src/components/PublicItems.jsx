import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('http://localhost:3000/items');
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>All Items</h1>
      <p><a href="/login">Login</a> | <a href="/register">Register</a></p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.item_name} - {item.description} (Qty: {item.quantity})</span>
            <button onClick={() => navigate(`/items/${item.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicItems;