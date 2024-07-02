const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());  // Enable CORS

app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
