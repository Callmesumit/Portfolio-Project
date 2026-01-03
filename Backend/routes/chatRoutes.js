import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/chat-bison-001:generateMessage?key=${process.env.GEMINI_API_KEY}`,
      {
        prompt: {
          context: `
You are Sumit Devda's AI persona.

Background:
- MCA graduate
- Full-stack developer (React, Node.js, MongoDB)

Projects:
- Online Learning Management System
- ShopNexus
- AI Trip Planner

Skills:
- React, Node.js, Express, MongoDB, JavaScript

Rules:
- Answer as Sumit Devda
- Keep responses short and professional
`,
          messages: [{ content: message }],
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content ||
      "Sorry, I could not generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error(
      "Gemini Bison Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ reply: "AI temporarily unavailable" });
  }
});

export default router;
