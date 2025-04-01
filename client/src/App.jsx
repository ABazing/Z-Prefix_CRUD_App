import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import ItemDetails from './components/ItemDetails';
import PublicItems from './components/PublicItems';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={user ? <Inventory user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items/:id" element={<ItemDetails user={user} />} />
        <Route path="/public-items" element={<PublicItems />} />
        <Route path="/" element={<Navigate to="/public-items" />} />
      </Routes>
    </Router>
  );
}

export default App;