import express from 'express';
import cookieparser from 'cookie-parser';
import createHttpError, { isHttpError } from 'http-errors';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subredditRoutes from './routes/subredditRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const FRONTEND_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5173'
		: process.env.PRODUCTION_URL;

app.use(
	cors({
		origin: FRONTEND_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/', (req, res) => {
	res.send('Hello World');
});
app.get('/api', (req, res) => {
	res.send('Hello World');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subreddits', subredditRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use((req, res, next) => {
	next(createHttpError(404, 'Endpoint Not found'));
});

app.use((error, req, res, next) => {
	console.error(error);
	let errorMessage = 'An unknown error occurred';
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: error.message });
});

export default app;
