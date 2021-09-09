import { IDatabase } from '../types';

export class Url {
  private readonly id: number;
  private readonly urlCode: string;
  private readonly longUrl: string;
  private readonly shortUrl: string;
  constructor(db: IDatabase) {
    this.id = db.id;
    this.urlCode = db.url_code;
    this.longUrl = db.long_url;
    this.shortUrl = db.short_url;
  }
  getShortUrl() {
    const responseData = {
      shortUrl: this.shortUrl,
    };
    return responseData;
  }
  getLongUrl() {
    const responseData = {
      longUrl: this.longUrl,
    };
    return responseData;
  }
}
