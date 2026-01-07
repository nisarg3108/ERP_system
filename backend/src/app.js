import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dbTestRoutes from './routes/db-test.routes.js';
import healthRoutes from './routes/health.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './auth/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

/* Global Middlewares */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/* Routes */
app.use('/api/health', healthRoutes);
app.use('/api/db-test', dbTestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/admin', adminRoutes);




/* Error Handler */
app.use(errorHandler);

export default app;
