import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ErrorAlert from '../Alerts/ErrorAlert';

const API_URL = process.env.REACT_APP_API_URL;

export default function Welcome() {
  const { user } = useContext(AuthContext);

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user['is_room']) {
      window.location.href = '/chat';
    }
  });

  const onClickGetUser = () => {
    // conn.send(JSON.stringify({action: "join-room", token}))
    (async () => {
      try {
        setErrorAlert(false);

        const resp = await fetch(`${API_URL}/free-user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('_t')}` },
        });

        if (resp.status === 200) {
          // const data = await resp.json();
          window.location.href = '/chat';
          // conn.send(JSON.stringify({ action: 'join-room', token: localStorage.getItem('_t') }));
        } else {
          setErrorMessage('No free users or something went wrong!');
          setErrorAlert(true);
        }
      } catch (e) {
        setErrorMessage('Server is not available!');
        setErrorAlert(true);
      }
    })();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {errorAlert ? <ErrorAlert message={errorMessage} /> : false}

      <h1 className="text-5xl font-bold text-neutral-300">Support Chat</h1>

      <div>
        {/*focus:outline-none focus:ring focus:ring-neutral-300*/}
        {user['role'] === 'support' ? (
          <button
            onClick={onClickGetUser}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 font-bold rounded text-neutral-300 p-3 mt-3 w-full"
          >
            Get User
          </button>
        ) : (
          <Link to={'/chat'}>
            <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 font-bold rounded text-neutral-300 p-3 mt-3 w-full">
              Get started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
