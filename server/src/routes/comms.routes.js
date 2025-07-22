import { Router } from 'express';
import { getCommsBySite, createComm, updateComm, deleteComm } from '../controllers/comms.controller.js';

const router = Router();
router.get('/site/:siteId', getCommsBySite);
router.post('/', createComm);
router.put('/:id', updateComm);
router.delete('/:id', deleteComm);
export default router;