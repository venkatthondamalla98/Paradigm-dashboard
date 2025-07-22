import Site from '../models/Site.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSites = asyncHandler(async (req, res) => {
  const sites = await Site.find();
  res.json(sites);
});

export const getSite = asyncHandler(async (req, res) => {
  const site = await Site.findById(req.params.id);
  if (!site) return res.status(404).json({ message: 'Site not found' });
  res.json(site);
});

export const createSite = asyncHandler(async (req, res) => {
  const site = await Site.create(req.body);
  res.status(201).json(site);
});

export const updateSite = asyncHandler(async (req, res) => {
  const site = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(site);
});

export const deleteSite = asyncHandler(async (req, res) => {
  await Site.findByIdAndDelete(req.params.id);
  res.status(204).end();
});