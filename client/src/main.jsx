import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// MUI
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
