// config/config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log(
	`Environment variables loaded: PORT=${process.env.PORT}, DB_CONNECTION_STRING=${process.env.MONGODB_URI}`
);
