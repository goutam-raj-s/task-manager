import request from 'supertest';
import app from '../src/app';
import { tasks } from '../src/models/task.model';

describe('Tasks API', () => {
  beforeEach(() => {
    // Clear tasks array before each test
    tasks.length = 0;
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
    expect(res.body.completed).toBe(false);
  });

  it('should fail to create a task without title or description', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title and description are required');
  });

  it('should get all tasks', async () => {
    await request(app).post('/tasks').send({ title: 'T1', description: 'D1' });
    await request(app).post('/tasks').send({ title: 'T2', description: 'D2' });

    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should get a task by id', async () => {
    const createRes = await request(app).post('/tasks').send({ title: 'T1', description: 'D1' });
    const taskId = createRes.body.id;

    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
    expect(res.body.title).toBe('T1');
  });

  it('should return 404 for getting a non-existent task', async () => {
    const res = await request(app).get('/tasks/non-existent-id');
    expect(res.status).toBe(404);
  });

  it('should update a task', async () => {
    const createRes = await request(app).post('/tasks').send({ title: 'T1', description: 'D1' });
    const taskId = createRes.body.id;

    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ completed: true, title: 'Updated T1' });
    
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.title).toBe('Updated T1');
  });

  it('should delete a task', async () => {
    const createRes = await request(app).post('/tasks').send({ title: 'T1', description: 'D1' });
    const taskId = createRes.body.id;

    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.status).toBe(204);

    const getRes = await request(app).get(`/tasks/${taskId}`);
    expect(getRes.status).toBe(404);
  });
});
