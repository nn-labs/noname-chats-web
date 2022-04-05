import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export default function useAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('_t')) {
      return;
    } else {
      (async () => {
        try {
          const resp = await fetch(`${API_URL}/auth/check`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('_t') }),
          });
          if (resp.status === 200) {
            setAuth(true);
            return;
          } else {
            setAuth(false);
            return;
          }
        } catch (_) {
          setAuth(false);
          return;
        }
      })();
    }
  }, []);

  return { auth };
}
