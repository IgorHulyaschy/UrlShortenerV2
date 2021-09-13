import shortid from 'shortid';
import config from 'config';
import { Url } from './model/Url';
import { Dao } from './model/dao';

export class UrlService {
  static async findAll(longUrl: string): Promise<boolean | object> {
    const result = await Dao.findOne(longUrl);
    if (result.rowCount !== 0) {
      console.log(result.rowCount);
      return new Url(result.rows[0]).getShortUrl();
    } else {
      return false;
    }
  }

  static async addUrl(longUrl: string): Promise<object> {
    const urlCode = shortid.generate();
    const shortUrl = `${config.get('server.baseUrl')}/${urlCode}`;
    const result = await Dao.insertUrl(urlCode, longUrl, shortUrl);
    return new Url(result.rows[0]).getShortUrl();
  }

  static async findByShortUrl(url: string) : Promise<object | boolean> {
    const resLongUrl = await Dao.getLongUrl(url);
    if (resLongUrl.rowCount !== 0) {
      return new Url(resLongUrl.rows[0]).getLongUrl();
    } else {
      return false;
    }
  }
}
