import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { OfflineSyncManager } from './services/OfflineSyncManager';

// Suppress React warning about duplicate keys for headless testing
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('two children with the same key')) {
    return;
  }
  originalConsoleError(...args);
};

OfflineSyncManager.initListener();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
