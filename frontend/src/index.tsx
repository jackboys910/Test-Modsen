import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import AppRouter from '@pages/router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(
  <I18nextProvider i18n={i18n}>
    <AppRouter />
  </I18nextProvider>,
);
