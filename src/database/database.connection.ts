import { Pool, ClientConfig } from 'pg';

import conf from 'config';

const dbConfig = {
  user: conf.get('database.user') as string,
  host: conf.get('database.host') as string,
  database: conf.get('database.dbName') as string,
  password: conf.get('database.password') as string,
  port: conf.get('database.port') as number,
};

class Database {
  private readonly pool: Pool;
  constructor(config: ClientConfig) {
    this.pool = new Pool(config);
  }

  query(sql: string) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

export default new Database(dbConfig);
