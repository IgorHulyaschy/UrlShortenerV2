import Router from 'koa-joi-router';
import { Controller } from './controller';
import cache from '../middlewares/cache';

const router = Router();

router.post('/api/url/shorten', Controller.createUrl);
router.get('/:urlCode', cache(300), Controller.getUrl);

export default router;
