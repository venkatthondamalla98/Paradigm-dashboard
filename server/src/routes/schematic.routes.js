import { Router } from 'express';
import { getSchematicBySite, createStage, updateStage, deleteStage } from '../controllers/schematic.controller.js';

const router = Router();
router.get('/site/:siteId', getSchematicBySite);
router.post('/', createStage);
router.put('/:id', updateStage);
router.delete('/:id', deleteStage);
export default router;