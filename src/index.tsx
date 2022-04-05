import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { PageContextComp } from './contexts/PageContext';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <PageContextComp>
    <BrowserRouter>
      {/*<React.StrictMode>*/}
      <App />
      {/*</React.StrictMode>*/}
    </BrowserRouter>
  </PageContextComp>,
);
