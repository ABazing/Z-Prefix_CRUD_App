import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetails({ user }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ item_name: '', description: '', quantity: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`http://localhost:3000/items/${id}`);
      if (!res.ok) throw new Error('Failed to fetch item');
      const data = await res.json();
      setItem(data);
      setFormData({ item_name: data.item_name, description: data.description, quantity: data.quantity });
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async () => {
    const updateRes = await fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id
      },
      body: JSON.stringify(formData)
    });
    if (!updateRes.ok) throw new Error('Failed to update item');
    setIsEditing(false);
    const fetchRes = await fetch(`http://localhost:3000/items/${id}`);
    if (!fetchRes.ok) throw new Error('Failed to fetch item');
    const data = await fetchRes.json();
    setItem(data);
  };

  const handleDelete = async () => {
    const deleteRes = await fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': user.id
      }
    });
    if (!deleteRes.ok) throw new Error('Failed to delete item');
    navigate('/inventory');
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