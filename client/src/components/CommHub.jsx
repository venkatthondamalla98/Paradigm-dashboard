import React from 'react';
import {
  Chip,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import Panel from './Panel'; // If you don't have Panel, replace with <Box> wrapper
import { Priority } from './Badges';
import api from '../api/client'; // axios instance

export default function CommHub({ siteId }) {
  const [tab, setTab] = React.useState('comm');

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  // dialog state
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState(null);
  const [current, setCurrent] = React.useState(null);
  const [note, setNote] = React.useState('');

  // store notes locally by comm id (dummy)
  const [notesById, setNotesById] = React.useState({});

  // Fetch comms on mount / site change
  React.useEffect(() => {
    if (!siteId) return;
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/comms/site/${siteId}`);
        if (!ignore) {
          setRows(data);
          setLoading(false);
        }
      } catch (e) {
        if (!ignore) {
          setErr(e);
          setLoading(false);
        }
      }
    })();

    return () => { ignore = true; };
  }, [siteId]);

  const handleAction = (item, type) => {
    setCurrent(item);
    setActionType(type);
    setNote(notesById[item._id] || '');
    setOpen(true);
  };

  const handleSave = () => {
    setNotesById(prev => ({ ...prev, [current._id]: note }));
    // TODO: replace with PUT `/comms/:id` call
    setOpen(false);
  };

  if (loading) {
    return (
      <Panel title="Communication Hub">
        <Box py={3} textAlign="center"><CircularProgress size={24} /></Box>
      </Panel>
    );
  }
  if (err) {
    return <Panel title="Communication Hub">Failed to load communications.</Panel>;
  }

  return (
    <Panel title="Communication Hub" sx={{ height: '100%' }}>
      <ToggleButtonGroup
        value={tab}
        exclusive
        onChange={(_, v) => v && setTab(v)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="comm" sx={{ textTransform: 'none', px: 3 }}>Communications</ToggleButton>
        <ToggleButton value="ai"   sx={{ textTransform: 'none', px: 3 }}>AI Assistant</ToggleButton>
      </ToggleButtonGroup>

      {rows.map(item => {
        const localNote = notesById[item._id];
        return (
          <Box
            key={item._id}
            sx={{
              bgcolor: 'rgba(15,23,42,0.5)',
              borderRadius: 2,
              p: 2,
              mb: 1.5,
              position: 'relative'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography fontSize={14} fontWeight={600}>{item.title}</Typography>
              {item.priority !== 'Normal'
                ? <Priority level={item.priority === 'High' ? 'High' : 'Medium'} />
                : <Chip size="small" label="Normal" color="success" />}
            </Box>

            <Typography fontSize={12} color="#94a3b8" mb={1.5} lineHeight={1.4}>
              {item.description}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography component="span" fontSize={10} color="#64748b">{item.timeAgo}</Typography>
              {item.status && (
                <Chip component="span" size="small" label={item.status} color={item.statusTone || 'default'} />
              )}
              {localNote && (
                <Chip component="span" size="small" label={`Note: ${localNote}`} color="info" />
              )}
            </Box>

            <Box display="flex" gap={1}>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleAction(item, 'flag')}
              >
                Flag Risk
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{ color: '#cbd5e1', borderColor: 'rgba(203,213,225,0.3)' }}
                onClick={() => handleAction(item, 'clarify')}
              >
                Clarify
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleAction(item, 'update')}
              >
                Update
              </Button>
            </Box>
          </Box>
        );
      })}

      {/* Dummy dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'flag'
            ? 'Flag Risk'
            : actionType === 'clarify'
            ? 'Clarify Message'
            : 'Update Communication'}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 1 }}>{current?.title}</Typography>
          <TextField
            label="Note"
            fullWidth
            multiline
            minRows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Panel>
  );
}
