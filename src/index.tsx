import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(<App />);
