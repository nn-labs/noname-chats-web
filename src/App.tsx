import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import useAuth from './hooks/authHook';
import routes from './routes';
import { AuthContext } from './contexts/AuthContext';

function App() {
  // const { user } = useAuth();
  useAuth();
  const { user } = useContext(AuthContext);
  const routing = useRoutes(routes(user));

  return <>{routing}</>;
}

export default App;
