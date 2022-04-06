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
            const data = await resp.json();
            setUser(data);
            return;
          } else {
            setUser(null);
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
