import shortid from 'shortid';
import config from 'config';
import db from '../database/database.connection';
import { Url } from './model/Url';

export class UrlService {
  static async findAll(longUrl: string): Promise<boolean | object> {
    const result = await db.query(`
        SELECT *
        FROM url_data
        WHERE long_url = '${longUrl}'
      `);
    if (result.rowCount !== 0) {
      return new Url(result.rows[0]).getShortUrl();
    } else {
      return false;
    }
  }

  static async addUrl(longUrl: string): Promise<object> {
    const urlCode = shortid.generate();
    const shortUrl = `${config.get('server.baseUrl')}/${urlCode}`;
    const result = await db.query(`
      INSERT INTO "url_data"
      (url_code, long_url, short_url) VALUES
      ('${urlCode}', '${longUrl}', '${shortUrl}')
      RETURNING *
    `);
    return new Url(result.rows[0]).getShortUrl();
  }

  static async findByShortUrl(url: string) : Promise<object> {
    const resLongUrl = await db.query(`
      SELECT long_url
      FROM url_data
      WHERE url_code = '${url}'
    `);
    return new Url(resLongUrl.rows[0]).getLongUrl();
  }
}
