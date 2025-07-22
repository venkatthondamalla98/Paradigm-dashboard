import Communication from '../models/Communication.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCommsBySite = asyncHandler(async (req, res) => {
  const comms = await Communication.find({ site: req.params.siteId });
  res.json(comms);
});

export const createComm = asyncHandler(async (req, res) => {
  const comm = await Communication.create(req.body);
  res.status(201).json(comm);
});

export const updateComm = asyncHandler(async (req, res) => {
  const comm = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(comm);
});

export const deleteComm = asyncHandler(async (req, res) => {
  await Communication.findByIdAndDelete(req.params.id);
  res.status(204).end();
});