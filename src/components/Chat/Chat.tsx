import React, { useEffect, useRef, useState } from 'react';
import ErrorAlert from '../Alerts/ErrorAlert';
import { encrypt } from '../../crypto/encode';
import { decrypt } from '../../crypto/decrypt';
import Loader from '../Loader/Loader';

let conn: WebSocket;
let fingerprint: string | null;

const WS_URL = process.env.REACT_APP_WS_URL;

export default function Chat() {
  const [messagesArray, setMessagesArray] = useState<Array<JSX.Element>>([]);

  const [errorAlert, setErrorAlert] = useState(false);
  const [socketErrorAlert, setSocketErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [socketErrorMessage, setSocketErrorMessage] = useState('');

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fingerprint = localStorage.getItem('fingerprint');
    conn = new WebSocket(`${WS_URL}/chat?fingerprint=${fingerprint}`);
  }, []);

  useEffect(() => {
    conn.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data['error']) {
        setSocketErrorAlert(false);
        setSocketErrorMessage(data['error']);
        setSocketErrorAlert(true);
      }

      if (data['action'] == 'connected') {
        setLoading(false);
      }

      if (
        data['action'] == 'publish-room' &&
        data['from'] !== fingerprint &&
        data['error'] == null
      ) {
        const decMsg = decrypt(data['message']);

        const msg = (
          <div className="chat-message" key={Math.random().toString()}>
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    {decMsg.toString()}
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
    try {
      setErrorAlert(false);
      if (message.length > 0) {
        const msg = (
          <div className="chat-message" key={Math.random().toString()}>
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    {message}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

        const encodeMessage = encrypt(message);
        conn.send(
          JSON.stringify({
            action: 'publish-room',
            message: encodeMessage,
            fingerprint: fingerprint,
          }),
        );
        setMessagesArray([...messagesArray, msg]);
        setMessage('');
      }
    } catch (e) {
      setErrorMessage('Failed send message');
      setErrorAlert(true);
    }
  };

  const handleKeypress = (e: any) => {
    if (e.charCode === 13 && message.length > 0) {
      try {
        setErrorAlert(false);
        const msg = (
          <div className="chat-message" key={Math.random().toString()}>
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    {message}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

        const encodeMessage = encrypt(message);
        conn.send(
          JSON.stringify({
            action: 'publish-room',
            message: encodeMessage,
            fingerprint: fingerprint,
          }),
        );
        setMessagesArray([...messagesArray, msg]);
        setMessage('');
      } catch (e) {
        setErrorMessage('Failed send message');
        setErrorAlert(true);
      }
    }
  };

  const onClickDisconnect = () => {
    conn.send(
      JSON.stringify({ action: 'disconnect', fingerprint: fingerprint }),
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {errorAlert ? <ErrorAlert message={errorMessage} /> : false}
        {socketErrorAlert ? <ErrorAlert message={socketErrorMessage} /> : false}
      </div>

      <Loader loading={loading} />

      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-auto"
        >
          {messagesArray.length != 0 ? <>{messagesArray}</> : <div />}
          <div ref={messagesEndRef} />
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
          </div>
        </div>
      </div>
    </>
  );
}
