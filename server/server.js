require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sahayak API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy"
  });
});

// Important route mounting
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/reports", reportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error"
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Sahayak backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server failed:", error.message);
    process.exit(1);
  }
};

startServer();