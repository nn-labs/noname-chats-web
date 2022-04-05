import React from 'react';

import { Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Error from './components/Error/Error';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';
import Welcome from './components/Home/Welcome';

const routes = (isLoggedIn: boolean) => [
  // {
  //   path: '/chat',
  //   element: isLoggedIn ? <Chat /> : <Navigate to="/login" />,
  // },
  //
  // {
  //   path: '/',
  //   element: !isLoggedIn ? <Home /> : <Navigate to="/chat" />,
  //   children: [
  //     { path: 'login', element: <Login /> },
  //     { path: '/', element: <Navigate to="/login" /> },
  //   ],
  // },

  {
    path: '/',
    element: !isLoggedIn ? <Home /> : <Welcome />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
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
