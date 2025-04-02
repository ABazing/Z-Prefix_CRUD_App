import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Inventory from './components/inventory';
import Item_Details from './components/item_details';
import Public_Items from './components/public_items';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={user ? <Inventory user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items/:id" element={<Item_Details user={user} />} />
        <Route path="/public_items" element={<Public_Items />} />
        <Route path="/" element={<Navigate to="/public_items" />} />
      </Routes>
    </Router>
  );
}

export default App;