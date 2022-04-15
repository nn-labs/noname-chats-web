import React from 'react';
import { Link } from 'react-router-dom';

// import fp from '@fingerprintjs/fingerprintjs';

export default function Welcome() {
  // useEffect(() => {
  //   (async () => {
  //     const fpLoad = await fp.load();
  //     const fpResult = await fpLoad.get()
  //     console.log(fpResult.visitorId)
  //   })();
  // });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold text-neutral-300">Welcome</h1>

      <div>
        <Link to={'/chat'}>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 font-bold rounded text-neutral-300 p-3 mt-3 w-full">
            Find Companion
          </button>
        </Link>
      </div>
    </div>
  );
}
