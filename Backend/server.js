// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); 

app.use('/api', courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
