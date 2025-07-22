import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';

const statusColor = (status) =>
  ({
    completed: 'success',
    'in-progress': 'warning',
    pending: 'info',
    impact: 'error',
    delay: 'error',
  }[status] || 'default');

const FlowCard = ({ title, items }) => (
  <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.1)' }}>
    <CardContent sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>

      {items.map((it, i) => (
        <Box key={i} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            {it.completed ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : it.warning ? (
              <WarningAmberIcon fontSize="small" color="warning" />
            ) : (
              <AccessTimeIcon fontSize="small" color="info" />
            )}
            <Typography variant="body2">{it.name}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {typeof it.percentage === 'number' && (
              <Typography variant="body2" fontWeight="bold">
                {it.percentage}%
              </Typography>
            )}
            {it.statusText && (
              <Chip size="small" label={it.statusText} color={statusColor(it.status)} />
            )}
            {it.date && (
              <Typography variant="caption" color="text.secondary">
                {it.date}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Simple CSV exporter
const exportCSV = (stages) => {
  const rows = [['Stage', 'Item', 'Percentage', 'Status', 'StatusText', 'Date']];
  stages.forEach((stage) => {
    stage.items.forEach((it) => {
      rows.push([
        stage.title,
        it.name || '',
        typeof it.percentage === 'number' ? it.percentage : '',
        it.status || '',
        it.statusText || '',
        it.date || '',
      ]);
    });
  });

  const csv = rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'project_schematic.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export default function ProjectSchematic({ stages = [] }) {
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" color="primary">
          Project Schematic
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => exportCSV(stages)}
        >
          Export
        </Button>
      </Box>

      <Grid container spacing={2}>
        {stages.map((stage) => (
          <Grid key={stage._id || stage.title} item xs={12} sm={6} md={4} lg={2}>
            <FlowCard title={stage.title} items={stage.items} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
