import express from 'express';
import cookieparser from 'cookie-parser';
import createHttpError, { isHttpError } from 'http-errors';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subredditRoutes from './routes/subredditRoutes.js';

const app = express();

const URL =
	process.env.ENV === 'development'
		? 'http://localhost:5173'
		: process.env.PRODUCTION_URL;

app.use(
	cors({
		origin: URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subreddits', subredditRoutes);

app.get('/', (req, res) => {
	res.send('Hello World');
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
