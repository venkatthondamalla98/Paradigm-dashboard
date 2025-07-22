import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827', // page bg
      paper:   '#1f2937', // panel bg
    },
    primary:  { main: '#10b981' }, // teal
    warning:  { main: '#f59e0b' },
    error:    { main: '#ef4444' },
    info:     { main: '#3b82f6' },
    success:  { main: '#22c55e' }
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: { root: { border: '1px solid rgba(255,255,255,0.08)' } }
    },
    MuiChip: {
      styleOverrides: {
        root: { fontSize: 11, height: 22, borderRadius: 12, fontWeight: 600, textTransform: 'capitalize' }
      }
    }
  },
  typography: {
    fontFamily: 'Segoe UI, Inter, sans-serif',
    h6: { fontSize: 18, fontWeight: 600 },
  }
});
