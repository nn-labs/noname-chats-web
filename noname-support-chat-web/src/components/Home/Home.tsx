import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold text-neutral-300">Support Chat</h1>

      <div>
        <Link to={'/login'}>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 font-bold rounded text-neutral-300 p-3 mt-3 w-full">
            Login
          </button>
        </Link>

        <Link to={'/registration'}>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 font-bold rounded text-neutral-300 p-3 mt-3 w-full">
            Registration
          </button>
        </Link>
      </div>
    </div>
  );
}
