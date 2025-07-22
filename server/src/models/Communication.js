import mongoose from 'mongoose';

const communicationSchema = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  title: String,
  description: String,
  priority: { type: String, default: 'Normal' },
  status: String,          // e.g. 'AI Generated'
  statusTone: String,      // 'info','success','error' => map to MUI colors
  timeAgo: String          // '2 minutes ago'
}, { timestamps: true });

export default mongoose.model('Communication', communicationSchema);