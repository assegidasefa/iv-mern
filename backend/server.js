import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/index.js"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

dotenv.config();
connectDB();

const app = express();
app.use(cors());  // Enable CORS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("dir name ",__dirname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
