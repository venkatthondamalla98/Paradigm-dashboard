import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  percentage: Number,
  completed: Boolean,
  warning: Boolean,
  status: String,        // 'completed','pending','impact','delay','in-progress'
  statusText: String,
  date: String           // optional textual date
});

const schematicStageSchema = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  title: { type: String, required: true },    // e.g. "Procurement"
  items: [itemSchema]
}, { timestamps: true });

export default mongoose.model('SchematicStage', schematicStageSchema);