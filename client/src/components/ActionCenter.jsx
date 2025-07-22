import React from 'react';
import Panel from './Panel';
import { Box, Typography } from '@mui/material';
import { Priority, Status } from './Badges';

const Item = ({ title, desc, right, meta }) => (
  <Box sx={{ bgcolor: 'rgba(15,23,42,0.5)', borderRadius: 2, p: 2, mb: 1.5, borderLeft: '4px solid #10b981' }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
      <Typography fontSize={14} fontWeight={600}>{title}</Typography>
      {right}
    </Box>
    <Typography fontSize={12} color="#94a3b8" mb={1}>{desc}</Typography>
    {meta && <Typography fontSize={11} color="#64748b">{meta}</Typography>}
  </Box>
);

export default function ActionCenter({ actions = [], risks = [] }) {
  return (
    <Panel title="Action Center" sx={{ height: '100%' }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', mb: 1, textTransform: 'uppercase' }}>
        Immediate Action Required
      </Typography>
      {actions.map((x) => (
        <Item
          key={x._id}
          title={x.title}
          desc={x.description}
          right={<Priority level={x.priority} />}
          meta={x.dueTime}
        />
      ))}

      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', mt: 2, mb: 1, textTransform: 'uppercase' }}>
        Critical Risk Register
      </Typography>
      {risks.map((x) => (
        <Item
          key={x._id}
          title={x.title}
          desc={x.description}
          right={<Priority level={x.impact === 'High' ? 'High' : x.impact === 'Medium' ? 'Medium' : 'Low'} />}
          meta={
            <>
              {x.due && x.due}
              {x.status && <Status label={x.status} tone={x.status === 'new' ? 'error' : 'info'} />}
            </>
          }
        />
      ))}
    </Panel>
  );
}
