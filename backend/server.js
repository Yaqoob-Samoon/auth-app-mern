const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const userRoutes = require("./routes/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Needed on Render so secure cookies work behind its proxy
app.set("trust proxy", 1);

// Connect DB
connectDB();

// Allowed frontend URLs (comma-separated in CLIENT_URL)
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => res.send("Auth API is running"));

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});