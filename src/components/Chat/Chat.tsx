import React, { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const [messagesArray, setMessagesArray] = useState<Array<JSX.Element>>([]);
  // const [fromMessages, setFromMessages] = useState<Array<JSX.Element>>([]);

  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);

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

    setMessagesArray([...messagesArray, msg]);
    setMessage('');
  };

  const onClickFakeMessage = () => {
    const msg = (
      <div className="chat-message" key={Math.random().toString()}>
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                Your error message says permission denied, npm global installs
                must be given root privileges.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
    setMessagesArray([...messagesArray, msg]);
  };

  const handleKeypress = (e: any) => {
    if (e.charCode === 13 && message.length >= 1) {
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

      setMessagesArray([...messagesArray, msg]);
      setMessage('');
    }
  };

  return (
    // <div className="flex flex-col justify-center items-center min-h-screen">
    //   <h1 className="text-5xl font-bold text-neutral-300">Chat</h1>
    // </div>
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
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
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={onClickSend}
              // block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-600 text-white px-3 py-3 font-semibold pointer-events-none
              className={
                message.length == 0
                  ? 'inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white font-semibold pointer-events-none bg-gray-500'
                  : 'inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
              }
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>

            <button onClick={onClickFakeMessage}>Fake from message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
