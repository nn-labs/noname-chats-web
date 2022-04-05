import React from 'react';

import { Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Error from './components/Error/Error';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: !isLoggedIn ? <Home /> : <Chat />,
  },
  // {
  //   path: '/chat',
  //   element: <Chat />,
  // },
  {
    path: '/login',
    element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
  },
  {
    path: '/registration',
    element: !isLoggedIn ? <Registration /> : <Navigate to="/" />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default routes;
