import express from "express";
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // 📧 Send email notification
    await sendEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent & saved successfully",
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





export default router;
