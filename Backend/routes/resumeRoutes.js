import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ES module path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../uploads/resume.pdf");

  res.download(filePath, "Sumit_Devda_Resume.pdf", (err) => {
    if (err) {
      console.error("Resume download error:", err);
      res.status(500).send("Could not download resume");
    }
  });
});

export default router;
