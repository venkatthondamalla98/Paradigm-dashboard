import mongoose from 'mongoose';

const actionItemSchema = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  title: String,
  description: String,
  priority: { type: String, enum: ['High','Medium','Low'], default: 'Medium' },
  dueTime: String,
  assignee: String,
  status: { type: String, enum: ['pending','in-review','overdue'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('ActionItem', actionItemSchema);