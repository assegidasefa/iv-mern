import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/index.js"


dotenv.config();
connectDB();

const app = express();
app.use(cors());  // Enable CORS

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
