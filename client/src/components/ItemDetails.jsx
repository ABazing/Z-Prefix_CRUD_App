import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetails({ user }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ item_name: '', description: '', quantity: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`http://localhost:3000/items/${id}`);
      setItem(res.data);
      setFormData({ item_name: res.data.item_name, description: res.data.description, quantity: res.data.quantity });
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3000/items/${id}`, formData, {
      headers: { 'x-user-id': user.id }
    });
    setIsEditing(false);
    const res = await axios.get(`http://localhost:3000/items/${id}`);
    setItem(res.data);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/items/${id}`, {
      headers: { 'x-user-id': user.id }
    });
    navigate('/inventory');
    alert('Item Deleted.');
  };

  if (!item) return <div>Loading...</div>;

  // Check if the logged-in user is the creator of the item
  const isCreator = user && item.userId === user.id;

  return (
    <div className="container">
      <h1>Item Details</h1>
      {isEditing ? (
        <div>
          <input type="text" value={formData.item_name} onChange={(e) => setFormData({ ...formData, item_name: e.target.value })} />
          <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {item.item_name}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          {isCreator && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
          <button onClick={() => navigate(user ? '/inventory' : '/public-items')}>Back</button>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;