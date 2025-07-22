import mongoose from 'mongoose';

const riskSchema = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  title: String,
  description: String,
  impact: { type: String, enum: ['High','Medium','Low'], default: 'Low' },
  probability: { type: String, enum: ['High','Medium','Low'], default: 'Low' },
  status: { type: String, enum: ['new','monitoring','resolved'], default: 'new' },
  category: String
}, { timestamps: true });

export default mongoose.model('Risk', riskSchema);