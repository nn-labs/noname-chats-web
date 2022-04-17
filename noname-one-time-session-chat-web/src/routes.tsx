import React from 'react';

import Error from './components/Error/Error';
import Chat from './components/Chat/Chat';
import Welcome from './components/Home/Welcome';

const routes = () => [
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
