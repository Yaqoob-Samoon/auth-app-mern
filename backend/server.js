const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const userRoutes = require("./routes/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173",   // React frontend
  credentials: true,                 // Allow cookies / JWT
}));

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
