import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PublicItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('http://localhost:3000/items');
      setItems(res.data);
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