import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';

import siteRoutes from './routes/sites.routes.js';
import schematicRoutes from './routes/schematic.routes.js';
import actionRoutes from './routes/actions.routes.js';
import riskRoutes from './routes/risks.routes.js';
import commRoutes from './routes/comms.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('API running'));

app.use('/api/sites', siteRoutes);
app.use('/api/schematic', schematicRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/risks', riskRoutes);
app.use('/api/comms', commRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));