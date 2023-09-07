//import react
import React from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Register
import Dashboard from './pages/Dashboard';


import Post from './View/Post';
import Create from './View/Create';
import Edit from './View/Edit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<Post />} />
        <Route path="/posts/create" element={<Create />} />
        <Route path="/posts/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
