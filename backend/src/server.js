require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./modules/auth/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express(); 

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", authRoutes);

// Error middleware hamesha last me
app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();