const request = require('supertest');
const server = require('../index');

const invalidId = 999;
const mockToken = 'desafiolatam';
const mockPayload = {
  id: 5,
  nombre: 'Frappe',
};

describe('Operaciones CRUD de cafes', () => {
  it('should return status 200 and a non-empty array when fetching all cafes', async () => {
    const response = await request(server).get('/cafes').send();
    const status = response.statusCode;
    const body = response.body;

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it('should return status 404 when attempting to delete a non-existent cafe', async () => {
    const response = await request(server)
      .delete(`/cafes/${invalidId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send();
    const status = response.statusCode;

    expect(status).toBe(404);
  });

  it('should return status 201 when a new cafe is successfully created', async () => {
    const response = await request(server).post('/cafes').send(mockPayload);
    const status = response.statusCode;

    expect(status).toBe(201);
  });

  it('should return status 400 when the id in the query params differs from the payload id', async () => {
    const response = await request(server).put(`/cafes/${invalidId}`).send(mockPayload);
    const status = response.statusCode;

    expect(status).toBe(400);
  });
});
