import Risk from '../models/Risk.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getRisksBySite = asyncHandler(async (req, res) => {
  const risks = await Risk.find({ site: req.params.siteId });
  res.json(risks);
});

export const createRisk = asyncHandler(async (req, res) => {
  const risk = await Risk.create(req.body);
  res.status(201).json(risk);
});

export const updateRisk = asyncHandler(async (req, res) => {
  const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(risk);
});

export const deleteRisk = asyncHandler(async (req, res) => {
  await Risk.findByIdAndDelete(req.params.id);
  res.status(204).end();
});