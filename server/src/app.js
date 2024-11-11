import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import AuthRoutes from './features/auth/auth.route.js';
import UserRoutes from './features/user/user.route.js';
import PostRoutes from './features/post/post.route.js';
import CategoryRoutes from './features/category/category.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/posts', PostRoutes);
app.use('/api/categories', CategoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
