import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// ✅ CORRECT __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api/chat", chatRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/contact", contactRoutes);

// frontend static files
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// SPA fallback
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../Frontend/dist/index.html")
  );
});

// DB + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));
