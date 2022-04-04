import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Error from './components/Error/Error';
import Registration from './components/Auth/Registration';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />

      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration />} />

      <Route path={'*'} element={<Error />} />
    </Routes>
  );
}

export default App;
