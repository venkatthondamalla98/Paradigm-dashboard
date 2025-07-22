import { Router } from 'express';
import { getActionsBySite, createAction, updateAction, deleteAction } from '../controllers/actions.controller.js';

const router = Router();
router.get('/site/:siteId', getActionsBySite);
router.post('/', createAction);
router.put('/:id', updateAction);
router.delete('/:id', deleteAction);
export default router;