import React from 'react';

import Error from './components/Error/Error';
import Chat from './components/Chat/Chat';
import Welcome from './components/Home/Welcome';

const routes = () => [
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

  // {
  //   path: '/',
  //   element: !user ? <Home /> : <Welcome />,
  // },
  // {
  //   path: '/chat',
  //   // element: <Chat />,
  //   element:
  //     user && user.role === 'support' && !user['is_room'] ? (
  //       <Welcome />
  //     ) : (
  //       <Chat />
  //     ),
  // },
  // {
  //   path: '/login',
  //   element: !user ? <Login /> : <Navigate to="/" />,
  // },
  // {
  //   path: '/registration',
  //   element: !user ? <Registration /> : <Navigate to="/" />,
  // },
  // {
  //   path: '*',
  //   element: <Error />,
  // },

  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default routes;