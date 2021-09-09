export interface IUrl {
  id?: number;
  urlCode?: string;
  longUrl?: string;
  shortUrl?: string;
}

export interface IDatabase {
  id: number;
  url_code: string;
  long_url: string;
  short_url: string;
}
export type cacheUrl = {responseUrl: {longUrl: string}};
export type redisUrl = {data: string};