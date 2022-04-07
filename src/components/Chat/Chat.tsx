import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ErrorAlert from '../Alerts/ErrorAlert';

let token: string | null;
let conn: WebSocket;

const API_URL = process.env.REACT_APP_API_URL;
const WS_URL = process.env.REACT_APP_WS_URL;

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [messagesArray, setMessagesArray] = useState<Array<JSX.Element>>([]);
  // const [fromMessages, setFromMessages] = useState<Array<JSX.Element>>([]);

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    token = localStorage.getItem('_t');
    conn = new WebSocket(`${WS_URL}/chat?token=${token}`);
  }, []);

  useEffect(() => {
    setErrorAlert(false);
    conn.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data['error']) {
        setErrorMessage(data['error']);
        setErrorAlert(true);
      }

      if (
        data['action'] == 'publish-room' &&
        data['from'] !== user['user_id'] &&
        data['error'] == null
      ) {
        const msg = (
          <div className="chat-message" key={Math.random().toString()}>
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    {data['message']}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
        setMessagesArray([...messagesArray, msg]);
      }
    };

    conn.onclose = function () {
      window.location.href = '/';
    };
  });

  useEffect(() => {
    (async () => {
      try {
        setErrorAlert(false);

        const resp = await fetch(`${API_URL}/get-room`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resp.status === 200) {
          const data = await resp.json();
          const roomDbMsg = [];
          for (const dataKey in data) {
            if (data[dataKey].to) {
              const msg = (
                <div className="chat-message" key={Math.random().toString()}>
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          {/*Can be verified on any platform using docker*/}
                          {data[dataKey].message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
              roomDbMsg.push(msg);
            } else {
              const msg = (
                <div className="chat-message" key={Math.random().toString()}>
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                          {data[dataKey].message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
              roomDbMsg.push(msg);
            }
          }

          setMessagesArray([...messagesArray, ...roomDbMsg]);
        } else {
          setErrorMessage('Something went wrong');
          setErrorAlert(true);
        }
      } catch (e) {
        setErrorMessage('Server is not available!');
        setErrorAlert(true);
      }
    })();
  }, []);

  const scrollToBottom = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messagesArray]);

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onClickSend = () => {
    if (message.length > 0) {
      const msg = (
        <div className="chat-message" key={Math.random().toString()}>
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  {/*Can be verified on any platform using docker*/}
                  {message}
                </span>
              </div>
            </div>
          </div>
        </div>
      );

      conn.send(JSON.stringify({ action: 'publish-room', message, token }));
      setMessagesArray([...messagesArray, msg]);
      setMessage('');
    }
  };

  const handleKeypress = (e: any) => {
    if (e.charCode === 13 && message.length > 0) {
      const msg = (
        <div className="chat-message" key={Math.random().toString()}>
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  {/*Can be verified on any platform using docker*/}
                  {message}
                </span>
              </div>
            </div>
          </div>
        </div>
      );

      conn.send(JSON.stringify({ action: 'publish-room', message, token }));
      setMessagesArray([...messagesArray, msg]);
      setMessage('');
    }
  };

  const onClickDisconnect = () => {
    conn.send(JSON.stringify({ action: 'disconnect', message, token }));
  };

  return (
    // <div className="flex flex-col justify-center items-center min-h-screen">
    //   <h1 className="text-5xl font-bold text-neutral-300">Chat</h1>
    // </div>
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      {errorAlert ? <ErrorAlert message={errorMessage} /> : false}

      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-auto"
      >
        {/*  /!*To message*!/*/}
        {messagesArray.length != 0 ? <>{messagesArray}</> : <div />}
        <div ref={messagesEndRef} />
        {/*From message*/}
        {/*{fromMessages.length != 0 ? <>{fromMessages}</> : <div />}*/}
      </div>

      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            value={message}
            placeholder="Write your message!"
            onChange={onChangeMessage}
            onKeyPress={handleKeypress}
            className="block w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
            required
          />

          <div
            className={
              message.length == 0
                ? 'rounded-full flex items-center justify-center m-2 transition duration-500 ease-in-out pointer-events-none bg-gray-500'
                : 'rounded-full flex items-center justify-center m-2 transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 focus:outline-none'
            }
          >
            <button type="button" onClick={onClickSend}>
              <svg
                // className="w-6 h-6 text-black origin-center transform rotate-90 m-2"
                className="w-6 h-6 text-black origin-center transform rotate-90 m-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          <div className="rounded-full flex items-center justify-center m-2 transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 focus:outline-none">
            <button type="button" onClick={onClickDisconnect}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black origin-center transform m-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>

          {/*<div className="absolute right-0 items-center inset-y-0 hidden sm:flex">*/}
          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={onClickSend}*/}
          {/*  // block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-600 text-white px-3 py-3 font-semibold pointer-events-none*/}
          {/*  className={*/}
          {/*    message.length == 0*/}
          {/*      ? 'inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white font-semibold pointer-events-none bg-gray-500'*/}
          {/*      : 'inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'*/}
          {/*  }*/}
          {/*>*/}
          {/*  <span className="font-bold">Send</span>*/}
          {/*  <svg*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    viewBox="0 0 20 20"*/}
          {/*    fill="currentColor"*/}
          {/*    className="h-6 w-6 ml-2 transform rotate-90"*/}
          {/*  >*/}
          {/*    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />*/}
          {/*  </svg>*/}
          {/*</button>*/}

          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={onClickDisconnect}*/}
          {/*  // block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-600 text-white px-3 py-3 font-semibold pointer-events-none*/}
          {/*  className="inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"*/}
          {/*>*/}
          {/*  <span className="font-bold">Disconnect</span>*/}
          {/*</button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
