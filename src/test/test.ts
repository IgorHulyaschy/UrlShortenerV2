import request from 'supertest';
import app from '../app';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll((done) => {
  done();
});
describe('GET - docs', () => {
  it('should return the docs web page', async () => {
    const response = await request(app.callback()).get('/docs');
    expect(response.status).toEqual(200);
  });
});

const refs: Array<string> = [
  'https://www.google.com',
  'https://github.com/IgorHulyaschy',
  'https://www.moooi.com/en/a-life-extraordinary',
  'https://www.youtube.com/',
  'https://stackoverflow.com/',
  'https://music.youtube.com/',
  'https://userway.org/',
];
function getRandomUrl(arr: Array<string>, max: number) {
  const index = Math.floor(Math.random() * max);
  return arr[index];
}
const longUrl = getRandomUrl(refs, 6);
let shortUrl: string = '';
describe('POST - api/url/shorten', () => {
  it('should return create new shortUrl', async () => {
    const response = await request(app.callback()).post('/api/url/shorten').send({ longUrl });
    expect(response.status).toBe(201);
    expect(response.body.shortUrl).toBeDefined();
    shortUrl = response.body.shortUrl;
  });
  it('should return already existing longUrl', async () => {
    const response = await request(app.callback()).post('/api/url/shorten').send({ longUrl });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      url: {
        shortUrl: shortUrl,
      },
    });
  });
  it('should return status error - 400', async () => {
    const response = await request(app.callback()).post('/api/url/shorten').send({ body: 123123 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid long URL',
    });
  });
});

describe('GET - /:urlCode', () => {
  it('should return longUrl giving shortUrl', async () => {
    const [urlCode] = shortUrl.split('http://localhost:3000').splice(1, 1);
    const response = await request(app.callback()).get(`${urlCode}`);
    expect(response.status).toBe(302);
  });
  it('should return status error - 404', async () => {
    const urlCode = 'qweqwqwe';
    const response = await request(app.callback()).get(`/${urlCode}`);
    expect(response.body).toEqual({
      message: 'This url does not exist',
    });
  });
});