import db from '../../database/database.connection';
export class Dao {
  static async findOne(longUrl: string) {
    return await db.query(`
    SELECT *
    FROM url_data
    WHERE long_url = '${longUrl}'
  `);
  }

  static async insertUrl(urlCode: string, longUrl: string, shortUrl: string) {
    return await db.query(`
    INSERT INTO "url_data"
    (url_code, long_url, short_url) VALUES
    ('${urlCode}', '${longUrl}', '${shortUrl}')
    RETURNING *
  `);
  }

  static async getLongUrl(url:string) {
    return await db.query(`
    SELECT long_url
    FROM url_data
    WHERE url_code = '${url}'
  `);
  }
}