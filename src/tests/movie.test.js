const request = require("supertest");
const app = require('../app');
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let id;

test('GET /movies debe traer todos las peliculas', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
  const newMovie = {
    name: 'Mon',
    image: 'http://image.com',
    synopsis: 'Excellent',
    releaseYear: '1990'
  }
  const res = await request(app)
    .post('/movies')
    .send(newMovie)
  id = res.body.id;
  console.log(res.body)
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newMovie.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
  const updateMovie = {
    name: "Mona"
  }
  const res = await request(app).put(`/movies/${id}`)
    .send(updateMovie)
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateMovie.name);
});

test('POST /movies/id/actors debe insertar los actores de una pelicula', async () => {
  const actor = await Actor.create({
    firstName: 'Mon',
    lastName: 'Salas',
    nationality: 'Mexico',
    image: 'http://image.com',
    birthday: '1990-07-30'
  })
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies/id/directors debe insertar los directores de una pelicula', async () => {
  const director = await Director.create({
    firstName: 'Mon',
    lastName: 'Salas',
    nationality: 'Mexico',
    image: 'http://image.com',
    birthday: '1990-07-30'
  })
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies/id/genres debe insertar los generos de una pelicula', async () => {
  const genre = await Genre.create({
    name: 'Mon'
  })
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('DELETE /movies/:id debe eliminar un actor ', async () => {
  const res = await request(app)
    .delete(`/movies/${id}`)
  expect(res.status).toBe(204);
});