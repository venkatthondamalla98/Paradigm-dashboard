import SchematicStage from '../models/SchematicStage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSchematicBySite = asyncHandler(async (req, res) => {
  const stages = await SchematicStage.find({ site: req.params.siteId });
  res.json(stages);
});

export const createStage = asyncHandler(async (req, res) => {
  const stage = await SchematicStage.create(req.body);
  res.status(201).json(stage);
});

export const updateStage = asyncHandler(async (req, res) => {
  const stage = await SchematicStage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stage);
});

export const deleteStage = asyncHandler(async (req, res) => {
  await SchematicStage.findByIdAndDelete(req.params.id);
  res.status(204).end();
});