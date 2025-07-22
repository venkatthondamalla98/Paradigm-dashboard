import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';

import ProjectSchematic from './ProjectSchematic';
import CommHub from './CommHub';
import ActionCenter from './ActionCenter';

import { fetchSites, fetchDashboardData } from '../api/dashboard';

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapDashboard() {
  // Load sites for markers
  const { data: sites = [], isLoading, isError, error } = useQuery({
    queryKey: ['sites'],
    queryFn: fetchSites
  });

  // Selected site bundle (site + schematic + comms + actions + risks)
  const [bundle, setBundle] = useState(null);
  const [tab, setTab] = useState('schematic');
  const [loadingBundle, setLoadingBundle] = useState(false);

  const openSite = async (siteDoc) => {
    try {
      setLoadingBundle(true);
      const full = await fetchDashboardData(siteDoc._id);
      setBundle(full);
      setTab('schematic');
    } catch (e) {
      console.error('fetchDashboardData error', e);
    } finally {
      setLoadingBundle(false);
    }
  };

  const closeDialog = () => setBundle(null);

  if (isLoading) {
    return (
      <Box p={2} display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={2} color="error.main">
        Failed to load sites: {String(error)}
      </Box>
    );
  }

  return (
    <Box display="flex" height="100vh">
      {/* Map */}
      <Box flex={1}>
        <MapContainer center={[19, 77]} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {sites.map((s) => (
            <Marker
              key={s._id}
              position={[s.latitude, s.longitude]}
              eventHandlers={{ click: () => openSite(s) }}
            >
              <Popup>{s.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      {/* Detail dialog */}
      <Dialog open={!!bundle} onClose={closeDialog} fullWidth maxWidth="xl">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {bundle?.site?.name || 'Loading...'}
          <IconButton onClick={closeDialog}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          {loadingBundle && (
            <Box py={4} textAlign="center">
              <CircularProgress />
            </Box>
          )}

          {!loadingBundle && bundle && (
            <>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary" sx={{ mb: 2 }}>
                <Tab label="Project Schematic" value="schematic" />
                <Tab label="Communications" value="comms" />
                <Tab label="Actions & Risks" value="actions" />
                <Tab label="Overview" value="overview" />
              </Tabs>

              {tab === 'schematic' && <ProjectSchematic stages={bundle.schematic} />}
              {tab === 'comms' && <CommHub siteId={bundle.site._id} />}
              {tab === 'actions' && <ActionCenter actions={bundle.actions} risks={bundle.risks} />}
              {tab === 'overview' && (
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>SPI: {bundle.site.spi}</Typography>
                  <Typography>Completion: {bundle.site.progress}%</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Capacity: {bundle.site.capacityMM} MM
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
