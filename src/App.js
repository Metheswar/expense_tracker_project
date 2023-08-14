import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Home from './Components/Home';

import Context from './Store/Context';
function App() {
  const context = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
       {context.Login &&  <Route path='/home' element={<Home />} /> }
       
      </Routes>
    </Router>
  );
}

export default App;
