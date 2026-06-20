require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./modules/auth/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const interviewRoutes = require("./modules/interviews/interview.routes");
const roomRoutes = require("./modules/rooms/room.routes");
const chatRoutes = require(
  "./modules/chat/chat.routes"
);

const app = express(); 

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/interviews", interviewRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/chat", chatRoutes);

// Error middleware hamesha last me
app.use(errorMiddleware);

const http = require("http");

const initializeSocket =
  require("./socket");

const startServer = async () => {
  await connectDB();

  const server =
    http.createServer(app);

  initializeSocket(server);

  server.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
};

startServer();