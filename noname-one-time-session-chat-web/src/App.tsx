import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import fp from '@fingerprintjs/fingerprintjs';

function App() {
  useEffect(() => {
    (async () => {
      const fpLoad = await fp.load();
      const fpResult = await fpLoad.get();
      const fingerprint = fpResult.visitorId;
      console.log(fpResult.visitorId);
      localStorage.setItem('fingerprint', fingerprint);
    })();
  }, []);

  const routing = useRoutes(routes());

  return <>{routing}</>;
}

export default App;
