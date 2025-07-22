import ActionItem from '../models/ActionItem.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getActionsBySite = asyncHandler(async (req, res) => {
  const actions = await ActionItem.find({ site: req.params.siteId });
  res.json(actions);
});

export const createAction = asyncHandler(async (req, res) => {
  const action = await ActionItem.create(req.body);
  res.status(201).json(action);
});

export const updateAction = asyncHandler(async (req, res) => {
  const action = await ActionItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(action);
});

export const deleteAction = asyncHandler(async (req, res) => {
  await ActionItem.findByIdAndDelete(req.params.id);
  res.status(204).end();
});