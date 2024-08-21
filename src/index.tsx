import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './pages/router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(<AppRouter />);
