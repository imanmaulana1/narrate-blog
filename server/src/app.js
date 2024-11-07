import prisma from './config/database.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import AuthRoutes from './features/auth/auth.route.js';
import UserRoutes from './features/user/user.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
