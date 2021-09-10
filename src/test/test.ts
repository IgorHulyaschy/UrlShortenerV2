const request = require('supertest');
const Koa = require('koa');
const app = require('../app');


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

describe('POST - /api/url/shorten', () => {
  it('should return already exsisting short URL', async () => {
    const bodyReq = [
      {
        longUrl: 'https://www.google.com/',
      },
      {
        longUrl: 'https://github.com/IgorHulyaschy',
      },
      {
        longUrl: 'https://www.moooi.com/en/a-life-extraordinary',
      },
    ];
    for (const body of bodyReq) {
      const response = await request(app.callback()).post('/api/url/shorten').send(body);
      expect(response.body).toStrictEqual({
        url: {
        },
      });
    }
  });
  // it('should return error - 400', async () => {
  //   const url = {
  //     longUrl: '123456',
  //   };
  //   const response = await request(server).post('/api/url/shorten').send(url);
  //   expect(response.body).toStrictEqual({
  //     message: 'Invalid long URL',
  //   });
  // });
  // it('should return error - 500', async () => {
  //   const url = {
  //     longUrl: 1,
  //   };
  //   await request(server).post('/api/url/shorten').send(url).expect(500);
  // });
});

// describe('GET - /:urlCode', () => {
//   it('should redirect to longUrl', async () => {
//     const urlCode = '8XTrYwxuT';
//     await request(server).get(`/${urlCode}`).expect(302);
//   });
//   it('should return error - 500', async () => {
//     const urlCode = '8XTrY';
//     await request(server).get(`/${urlCode}`).expect(500);
//   });
// });
