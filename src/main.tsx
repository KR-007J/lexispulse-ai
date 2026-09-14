/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.DEV) {
  // @ts-ignore – axe-core/react is an optional dev dependency for a11y auditing
  import('@axe-core/react').then(({ default: axe }: { default: (r: unknown, rd: unknown, t: number) => void }) => {
    axe(React, ReactDOM, 1000);
  }).catch(() => {
    // axe-core not available, skipping
  });
}
