const request = require("supertest");
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
  const newActor = {
    firstName: 'Mon',
    lastName: 'Salas',
    nationality: 'Mexico',
    image: 'http://image.com',
    birthday: '1990-07-30'
  }
  const res = await request(app)
    .post('/actors')
    .send(newActor)
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
  const updateActor = {
    firstName: "Mona"
  }
  const res = await request(app).put(`/actors/${id}`)
    .send(updateActor)
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateActor.firstName);
});

test('DELETE /actors/:id debe eliminar un actor ', async () => {
  const res = await request(app)
    .delete(`/actors/${id}`)
  expect(res.status).toBe(204);
});