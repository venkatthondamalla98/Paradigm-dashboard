import { Card, CardContent, Typography } from '@mui/material';

export default function Panel({ title, children, sx }) {
  return (
    <Card sx={{ bgcolor: 'background.paper', p: 2, ...sx }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, color: '#e2e8f0' }}>{title}</Typography>
      )}
      <CardContent sx={{ p: 0 }}>{children}</CardContent>
    </Card>
  );
}