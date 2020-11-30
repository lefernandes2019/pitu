import { Router } from 'express'; //importando o método Router da lib express
import linksController from '../controllers/links';

const router = Router();

router.post('/links', linksController.postLink);

router.get('/links/:codigo', linksController.visitedLink);

router.get('/links/:codigo/estatisticas', linksController.getStatsLink);

export default router;
