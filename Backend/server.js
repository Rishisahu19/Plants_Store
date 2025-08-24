import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import plantRoutes from "./routes/plantRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

// Validate ENV vars
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env");
  process.exit(1);
}

connectDB();

const app = express();

// Middlewares
// app.use(cors());
app.use(cors({
  origin: "*",
}));
app.use(express.json());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/plants", plantRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
