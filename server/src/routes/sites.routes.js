import { Router } from 'express';
import { getSites, getSite, createSite, updateSite, deleteSite } from '../controllers/sites.controller.js';

const router = Router();
router.route('/')
  .get(getSites)
  .post(createSite);

router.route('/:id')
  .get(getSite)
  .put(updateSite)
  .delete(deleteSite);

export default router;