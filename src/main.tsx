import React from 'react';
import ReactDOM from 'react-dom/client';
import './design/globals.css';
import { RouterProvider } from 'react-router-dom';

import { router } from '../src/routes';
import { ConfigProvider } from './config/configProvider';
import { mockApiData } from './config/mockApiData';
import { ThemeProvider } from './shared/providers/ThemeProvider';

import "@/shared/lib/i18n"
import { Toaster } from 'sonner';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider apiData={mockApiData || {}}>
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);