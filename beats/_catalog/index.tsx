/**
 * Catalog Entry Point
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import CatalogPage from './CatalogPage';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <CatalogPage />
    </React.StrictMode>
  );
}
