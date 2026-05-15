import cors from 'cors';
import express from 'express';
import authRoutes from './features/auth/auth.routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.use(errorHandler);

export default app;
