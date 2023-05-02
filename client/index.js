import React from "react";
import {createRoot} from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './components/App';

const queryClient = new QueryClient();

const root = document.getElementById('app');
createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
