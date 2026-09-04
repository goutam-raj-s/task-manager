import express from 'express';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
