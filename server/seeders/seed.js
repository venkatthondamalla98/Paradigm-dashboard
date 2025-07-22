import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Site from '../src/models/Site.js';
import SchematicStage from '../src/models/SchematicStage.js';
import ActionItem from '../src/models/ActionItem.js';
import Risk from '../src/models/Risk.js';
import Communication from '../src/models/Communication.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

await Promise.all([
  Site.deleteMany({}),
  SchematicStage.deleteMany({}),
  ActionItem.deleteMany({}),
  Risk.deleteMany({}),
  Communication.deleteMany({})
]);

const site = await Site.create({
  name: 'Devra 50 MW', code: 'aurang', latitude: 19.8762, longitude: 75.3433,
  capacityMM: 150, progress: 42, spi: 0.85
});

await SchematicStage.insertMany([
  { site: site._id, title: 'Development & Permitting', items: [
    { name: 'Land Acquisition', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
    { name: 'PPA Signed', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
    { name: 'Permits Secured', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
  ]},
  { site: site._id, title: 'Engineering & Design', items: [
    { name: 'Design Approval', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
    { name: 'Engineering Complete', percentage: 100, completed: true, status: 'completed', statusText: 'Grid Connection' },
    { name: 'Layout Finalized', percentage: 75, warning: true, status: 'pending', statusText: 'Jul 17' },
  ]},
  { site: site._id, title: 'Procurement', items: [
    { name: 'Module Delivery', percentage: 35, warning: true, status: 'impact', statusText: 'Monsoon Impact' },
    { name: 'Inverter Delivery', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
    { name: 'BOS Procurement', percentage: 60, warning: true, status: 'pending', statusText: 'Aug 10' },
  ]},
  { site: site._id, title: 'Construction', items: [
    { name: 'Civil Works', percentage: 100, completed: true, status: 'completed', statusText: 'Completed' },
    { name: 'Mounting Structure', percentage: 45, warning: true, status: 'in-progress', statusText: 'In Progress' },
    { name: 'Electrical Installation', percentage: 0, status: 'pending', statusText: 'Sep 15' },
  ]},
  { site: site._id, title: 'Testing & Commissioning', items: [
    { name: 'Pre-commissioning', percentage: 0, status: 'delay', statusText: 'Module Delay' },
    { name: 'Grid Sync', percentage: 0, date: 'Oct 5' },
    { name: 'Final Acceptance', percentage: 0, date: 'Oct 15' },
  ]},
]);

await ActionItem.create({
  site: site._id,
  title: 'RFI from EPC Contractor',
  description: 'Technical review required for foundation specifications',
  priority: 'High',
  dueTime: 'Due in 2 hours',
  assignee: 'Engineering Team',
  status: 'pending'
});

await Risk.create({
  site: site._id,
  title: 'Logistics Delay Risk',
  description: 'Potential schedule conflict detected in equipment delivery timeline',
  impact: 'High',
  probability: 'Medium',
  status: 'new',
  category: 'logistics'
});

await Communication.create({
  site: site._id,
  title: 'Alfred Insight: Risk Detected',
  description: 'Schedule conflict identified...',
  priority: 'High',
  status: 'AI Generated',
  statusTone: 'info',
  timeAgo: '2 minutes ago'
});

console.log('Seeded ✔️');
await mongoose.disconnect();
process.exit(0);