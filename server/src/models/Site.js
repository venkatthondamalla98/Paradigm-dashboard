// src/models/Site.js
import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: String,
  latitude: Number,
  longitude: Number,
  city: String,
  state: String,
  capacityMM: Number,
  progress: Number,
  spi: Number,
}, { timestamps: true });

export default mongoose.model('Site', siteSchema);
