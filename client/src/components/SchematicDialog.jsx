import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Tabs, Tab, IconButton, Box, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProjectSchematic from './ProjectSchematic';

export default function SchematicDialog({ open, onClose, site }) {
  const [tab, setTab] = React.useState('schematic');

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {`Daily Site Briefing - ${site?.name || ''}`}
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Network Overview" value="overview" />
          <Tab label="Project Schematic" value="schematic" />
        </Tabs>

        {tab === 'schematic' && <ProjectSchematic />}
        {tab === 'overview' && (
          <Box p={2}>
            <Typography>Overview content goes here...</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
