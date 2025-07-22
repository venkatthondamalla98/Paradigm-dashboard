import { Router } from 'express';
import { getRisksBySite, createRisk, updateRisk, deleteRisk } from '../controllers/risks.controller.js';

const router = Router();
router.get('/site/:siteId', getRisksBySite);
router.post('/', createRisk);
router.put('/:id', updateRisk);
router.delete('/:id', deleteRisk);
export default router;