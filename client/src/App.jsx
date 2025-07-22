import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import MapSection from './components/MapSection';
import CommHub from './components/CommHub';
import ActionCenter from './components/ActionCenter';
import SchematicDialog from './components/SchematicDialog';

export default function App() {
  const [site, setSite] = React.useState(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ bgcolor: '#0f172a' }} elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Alfred</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" sx={{ borderRadius: 20, textTransform: 'none' }}>Command Centre</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>Reporting & Compliance</Button>
          </Box>
          <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'info.main' }} />
        </Toolbar>
      </AppBar>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 2,
        p: 2,
        maxWidth: 1400,
        mx: 'auto'
      }}>
        <MapSection onClickSite={setSite} />
        <CommHub />
        <ActionCenter />
      </Box>

      <SchematicDialog open={!!site} onClose={() => setSite(null)} site={site} />
    </Box>
  );
}
