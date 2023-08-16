import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Home from './Components/Home';

import Context from './Store/Context';
import Profile from './Components/Profile';
import Header from './Components/Header';
function App() {
  const context = useContext(Context);
  return (
    <Router>
      {context.Login && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<LoginPage />} />
       {context.Login &&  <Route path='/home' element={<Home />} /> }
       {context.Login && context.update && <Route path='/profile' element={<Profile />} /> }
      </Routes>
    </Router>
  );
}

export default App;
