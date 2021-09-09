import validUrl from 'valid-url';
import config from 'config';
import { AppContext } from '../app';
import { UrlService } from './service';

export class Controller {
  static async createUrl(ctx: AppContext) {
    const { longUrl } = ctx.request.body;
    if (!validUrl.isUri(config.get('server.baseUrl'))) {
      ctx.status = 400;
      return (ctx.body = {
        message: 'Invalid base URL',
      });
    }
    if (validUrl.isUri(longUrl)) {
      try {
        const url = await UrlService.findAll(longUrl);
        if (url) {
          ctx.status = 200;
          return (ctx.body = {
            url,
          });
        }
        ctx.status = 201;
        return (ctx.body = await UrlService.addUrl(longUrl));
      } catch (err) {
        console.log(err);
        ctx.status = 500;
      }
    } else {
      ctx.status = 400;
      return (ctx.body = {
        message: 'Invalid long URL',
      });
    }
  }

  static async getUrl(ctx: AppContext) {
    try {
      const { urlCode } = ctx.request.params;

      const responseUrl = await UrlService.findByShortUrl(urlCode);
      if (responseUrl) {
        ctx.body = {
          responseUrl,
        };
      } else {
        ctx.status = 404;
        return (ctx.body = {
          message: 'This url does not exist',
        });
      }
    } catch (err) {
      ctx.status = 500;
      return (ctx.body = {
        message: 'Server Error',
      });
    }
  }

  static test(ctx: AppContext) {
    ctx.redirect('https://www.youtube.com/watch?v=oaJq1mQ3dFI');
  }
}
