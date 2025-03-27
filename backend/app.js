const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors'); 

app.use(cors());

const connectDB = require('./db/connect');
connectDB(process.env.MONGO_URI);

app.use(express.json());

app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
