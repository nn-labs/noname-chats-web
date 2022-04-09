import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

export default function useAuth() {
  // const [auth, setAuth] = useState(null);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('_t')) {
      return;
    } else {
      (async () => {
        let userData;
        try {
          userData = await check();
          if (!userData) {
            await refresh();
            userData = await check();
            setUser(userData);
            return;
          }
        } catch (_) {
          setUser(null);
          return;
        }
      })();
    }
  }, []);

  // return { auth };
}

async function check() {
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
      return await resp.json();
    }
  } catch (e) {
    return e;
  }
}

async function refresh() {
  try {
    const resp = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('_t') }),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      localStorage.setItem('_t', data.access_token);
      localStorage.setItem('_r', data.refresh_token);
    }
  } catch (e) {
    return e;
  }
}
