import { Chip } from '@mui/material';

export const Priority = ({ level }) => {
  const map = {
    High:   { color: 'error',   label: 'High Priority' },
    Medium: { color: 'warning', label: 'Medium' },
    Low:    { color: 'success', label: 'Low' },
  };
  const { color, label } = map[level] || { color: 'default', label: level };
  return <Chip size="small" color={color} label={label} />;
};

export const Status = ({ label, tone }) => (
  <Chip size="small" label={label} color={tone || 'default'} />
);
