import React from 'react';
import './Loader.css';

import trail from '../../assets/img/bloodtrail.png';

interface ILoader {
  loading: boolean;
}

export default function Loader(prop: ILoader) {
  return (
    <>
      {prop.loading ? (
        // <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-20 overflow-hidden flex flex-col items-center justify-center">
          {/*<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">*/}
          {/*  <img src={nnwLogo} alt="" />*/}
          {/*</div>*/}

          <div className="loader mb-4">
            <img src={trail} alt={'logo'} />
          </div>
          {/*<h2 className="text-center text-white text-xl font-semibold">*/}
          {/*  Loading...*/}
          {/*</h2>*/}
          {/*<p className="w-full p-2 text-center text-white">*/}
          {/*  This may take a few seconds or minuter it dependent on your number of*/}
          {/*  music, please dont close this page.*/}
          {/*</p>*/}
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
