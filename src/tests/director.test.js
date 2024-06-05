const request = require("supertest");
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
  const newDirector = {
    firstName: 'Mon',
    lastName: 'Salas',
    nationality: 'Mexico',
    image: 'http://image.com',
    birthday: '1990-07-30'
  }
  const res = await request(app)
    .post('/directors')
    .send(newDirector)
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id debe actualizar un director', async () => {
  const updateDirector = {
    firstName: "Mona"
  }
  const res = await request(app).put(`/directors/${id}`)
    .send(updateDirector)
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateDirector.firstName);
});

test('DELETE /directors/:id debe eliminar un director ', async () => {
  const res = await request(app)
    .delete(`/directors/${id}`)
  expect(res.status).toBe(204);
});