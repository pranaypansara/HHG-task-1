import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (future)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'HH Goa Builder Card Server is running' });
});

export default app;
