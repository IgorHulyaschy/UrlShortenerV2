import { AppContext, getAsync, setAsync } from '../app';
import { cacheUrl } from '../url/types';

export default (duration: number) => async (ctx: AppContext, next: () => Promise<void>) => {
  try {
    if (ctx.method !== 'GET') {
      console.error('Cannot cache non-GET methods!');
      return next();
    }
    const key = ctx.originalUrl;
    const longUrl = await getAsync(key);
    if (longUrl !== null) {
      console.log('redirect from cache');
      ctx.redirect(longUrl);
    } else {
      await next();
      console.log(`Cache miss for ${key}`);
      const { responseUrl } = <cacheUrl>ctx.body;
      await setAsync(key, duration, responseUrl.longUrl);
      ctx.redirect(responseUrl.longUrl);
    }
  } catch (err) {
    console.log(err);
    ctx.status = 400;
  }
};