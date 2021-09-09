import Koa, { Context } from 'koa';
import config from 'config';
import bodyParser from 'koa-body';
import Router from 'koa-joi-router';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import redis from 'redis';
import { promisify } from 'util';

import urlRouter from './url/router';

export interface AppContext extends Context {}

const client = redis.createClient(config.get('redis.port'));
export const setAsync = promisify(client.setex).bind(client);
export const getAsync = promisify(client.get).bind(client);

const app = new Koa();

app.use(serve('src/docs'));
app.use(
  koaSwagger({
    routePrefix: '/docs',
    hideTopbar: true,
    swaggerOptions: {
      url: `${config.get('server.baseUrl')}/docs.yml`,
    },
  }),
);
const router = Router();
app.use(bodyParser());
router.use(urlRouter.middleware());
app.use(router.middleware());

export default app;
