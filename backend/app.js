const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Import existing routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");


const app = express();

// CORS configuration
const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like file:// requests)
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json());

const connectDB = require('./db/connect');
connectDB(process.env.MONGO_URI);

// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
