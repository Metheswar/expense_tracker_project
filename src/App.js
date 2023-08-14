import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';

function App() {
  return (
<Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
 </Router>

  );
}

export default App;
