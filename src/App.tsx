import React from 'react';
import { useRoutes } from 'react-router-dom';
import useAuth from './hooks/authHook';
import routes from './routes';

function App() {
  const { auth } = useAuth();
  const routing = useRoutes(routes(auth));

  return <>{routing}</>;
}

export default App;
